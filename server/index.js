const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory "database" for demonstration
const appointments = [];

// Routes
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
    const { name, phone, service, barber, date, time, notes } = req.body;

    // Basic validation
    if (!name || !phone || !service || !barber || !date || !time) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const newAppointment = {
        id: appointments.length + 1,
        name,
        phone,
        service,
        barber,
        date,
        time,
        notes,
        createdAt: new Date().toISOString()
    };

    appointments.push(newAppointment);

    console.log('✅ Nueva cita agendada:', newAppointment);

    res.status(201).json({
        message: 'Cita agendada con éxito',
        appointment: newAppointment
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
