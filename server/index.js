const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MariaDB/MySQL Connection using Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql', // MariaDB use the mysql dialect
        logging: false
    }
);

// Appointment Model
const Appointment = sequelize.define('Appointment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    service: {
        type: DataTypes.STRING,
        allowNull: true // Permitiendo null ya que el form parece haber cambiado
    },
    barber: {
        type: DataTypes.STRING,
        allowNull: true // Permitiendo null ya que el form parece haber cambiado
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

// Admin (Login) Model
const Admin = sequelize.define('login', {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    estado: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }
}, {
    // Explicitly define table name matching the screenshot
    tableName: 'login',
    // Disable timestamps if the table doesn't have createdAt/updatedAt
    timestamps: false
});

// Sync Database
sequelize.sync()
    .then(() => console.log('✅ Conectado a MariaDB y tablas sincronizadas'))
    .catch(err => console.error('❌ Error al conectar a MariaDB:', err));

// Routes
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            order: [['date', 'ASC'], ['time', 'ASC']]
        });
        res.json(appointments);
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
});

app.post('/api/appointments', async (req, res) => {
    try {
        const { name, phone, service, barber, date, time, notes } = req.body;

        // Basic validation
        if (!name || !phone || !date || !time) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const newAppointment = await Appointment.create({
            name,
            phone,
            service,
            barber,
            date,
            time,
            notes
        });

        console.log('✅ Nueva cita agendada en MariaDB:', newAppointment.toJSON());

        res.status(201).json({
            message: 'Cita agendada con éxito',
            appointment: newAppointment
        });
    } catch (error) {
        console.error('Error al guardar cita en MariaDB:', error);
        res.status(500).json({ error: 'Error al agendar la cita en la base de datos' });
    }
});

// Admin Login Endpoint
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
        }

        // Buscar el usuario que coincida y que esté activo (estado = 1)
        const admin = await Admin.findOne({
            where: {
                username: username,
                password: password,
                estado: 1
            }
        });

        if (admin) {
            console.log(`✅ Login exitoso para el usuario: ${username}`);
            // En un futuro, aquí generarías y devolverías un token JWT
            res.json({
                message: 'Login exitoso',
                token: 'fake-jwt-token-para-desarrollo'
            });
        } else {
            console.warn(`❌ Intento de login fallido para el usuario: ${username}`);
            res.status(401).json({ error: 'Credenciales incorrectas o usuario inactivo' });
        }

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
