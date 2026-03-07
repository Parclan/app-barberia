import React, { useState } from "react";
import { User, LockKey, ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { sileo } from "sileo";
import logo from "../../assets/logo.jpg";

const AdminLogin = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const update = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.username.trim()) newErrors.username = "Ingresa tu usuario";
        if (!form.password.trim()) newErrors.password = "Ingresa tu contraseña";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                // Adjust the URL according to your actual backend route
                const response = await fetch("http://localhost:5000/api/admin/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    const data = await response.json();
                    sileo.success({ title: "Login exitoso", description: "Redirigiendo...", duration: 2000 });
                    // Aquí puedes guardar el token y redirigir
                    // localStorage.setItem("token", data.token);
                    // window.location.href = "/admin/dashboard";
                } else {
                    sileo.error({ title: "Acceso denegado", description: "Credenciales incorrectas", duration: 2000 });
                }
            } catch (error) {
                console.error("Error:", error);
                sileo.error({ title: "Error", description: "Error de conexión con el servidor" });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
            <div className="w-full max-w-[420px]">
                {/* Header */}
                <div className="text-center mb-8 fade-up">
                    <div className="flex items-center justify-center gap-2 mb-1 ">
                        <img src={logo} alt="Logo" className="w-20 h-20 rounded-full mb-4 border-4 border-[#c9a84c]" />
                    </div>
                    <h1 className="font-display text-[28px] sm:text-[36px] font-black text-[#f5f0e8] leading-tight m-0">
                        Barber <span className="text-[#c9a84c]">Lucho</span>
                    </h1>
                </div>

                {/* Card */}
                <div className="bg-[#111] rounded-[24px] sm:rounded-[32px] p-5 sm:p-7 fade-up border border-[#222] shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
                    <div className="space-y-6">
                        <div className="mb-2">
                            <Link to="/" className="inline-flex items-center text-[#666] hover:text-[#c9a84c] transition-colors text-xs mb-4">
                                <ArrowLeft size={14} className="mr-1" /> Volver al Inicio
                            </Link>
                            <h2 className="font-display text-2xl text-[#f5f0e8] m-0">Acceso Admin</h2>
                            <p className="text-[#555] text-[13px] mt-1">Ingresa tus credenciales para continuar.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#666] mb-2">
                                    Usuario
                                </label>
                                <div className="relative">
                                    <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#444]">
                                        <User size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.username}
                                        onChange={e => update("username", e.target.value)}
                                        placeholder="tu_usuario"
                                        className={`w-full pl-[46px] pr-4 py-[14px] bg-[#161616] border rounded-xl text-[#f5f0e8] text-sm outline-none transition-all ${errors.username ? "border-[#c0392b]" : "border-[#252525]"
                                            } focus:border-[#c9a84c]`}
                                    />
                                </div>
                                {errors.username && <p className="text-[#c0392b] text-xs mt-1">{errors.username}</p>}
                            </div>

                            <div>
                                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#666] mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#444]">
                                        <LockKey size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        value={form.password}
                                        onChange={e => update("password", e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full pl-[46px] pr-4 py-[14px] bg-[#161616] border rounded-xl text-[#f5f0e8] text-sm outline-none transition-all ${errors.password ? "border-[#c0392b]" : "border-[#252525]"
                                            } focus:border-[#c9a84c]`}
                                    />
                                </div>
                                {errors.password && <p className="text-[#c0392b] text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div className="mt-8 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="gold-btn w-full py-4 rounded-xl border-none text-[#0a0a0a] text-sm font-bold tracking-wide flex justify-center items-center transition-all bg-gradient-to-r from-[#c9a84c] to-[#e8cc7a] hover:opacity-90 disabled:opacity-50"
                                >
                                    {loading ? "Cargando..." : "Iniciar Sesión"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
