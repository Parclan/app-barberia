import React, { useState } from "react";
import PersonalInfoStep from "./FormSteps/PersonalInfoStep";
import DateTimeStep from "./FormSteps/DateTimeStep";
import ConfirmStep from "./FormSteps/ConfirmStep";
import SuccessScreen from "./SuccessScreen";
import logo from "../assets/logo.jpg";

const BarbershopForm = () => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        date: new Date().toISOString().split("T")[0],
        time: "",
    });
    const [errors, setErrors] = useState({});

    const update = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validateStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!form.name.trim()) newErrors.name = "Ingresa tu nombre";
            if (!form.phone.trim()) newErrors.phone = "Ingresa tu teléfono";
        }
        if (step === 2) {
            if (!form.date) newErrors.date = "Selecciona una fecha";
            if (!form.time) newErrors.time = "Selecciona una hora";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) setStep((s) => s + 1);
    };

    const handleBack = () => setStep((s) => s - 1);

    const handleSubmit = async () => {
        if (validateStep()) {
            try {
                // Here we will call the Node.js backend later
                const response = await fetch("http://localhost:5000/api/appointments", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    setSubmitted(true);
                } else {
                    alert("Error al agendar la cita. Inténtalo de nuevo.");
                }
            } catch (error) {
                console.error("Error:", error);
                // Fallback for now if backend is not running
                setSubmitted(true);
            }
        }
    };

    const handleReset = () => {
        setSubmitted(false);
        setStep(1);
        setForm({
            name: "",
            phone: "",
            date: new Date().toISOString().split("T")[0],
            time: "",
        });
    };

    const stepLabels = ["Tus datos", "Fecha & Hora", "Confirmar"];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d]">
            <div className="w-full max-w-[480px]">
                {/* Header */}
                <div className="text-center mb-8 fade-up">
                    <div className="flex items-center justify-center gap-2 mb-1 text-[#c9a84c]">
                        <img src={logo} alt="Logo" className="w-20 h-20 rounded-full mb-4" />
                    </div>
                    <h1 className="font-display text-[28px] sm:text-[36px] font-black text-[#f5f0e8] leading-tight m-0">
                        Barber Lucho
                    </h1>
                </div>

                {/* Card */}
                <div className="bg-[#111] rounded-[24px] sm:rounded-[32px] p-5 sm:p-7 fade-up border border-[#222] shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
                    {!submitted ? (
                        <>
                            {/* Progress */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-3">
                                    {stepLabels.map((label, i) => (
                                        <div key={i} className="flex flex-col items-center gap-1 flex-1">
                                            <div
                                                className={`rounded-full flex items-center justify-center text-[11px] font-bold w-7 h-7 transition-all duration-300 ${i + 1 <= step ? "bg-[#c9a84c] text-[#0a0a0a]" : "bg-[#1e1e1e] text-[#444]"
                                                    } ${i + 1 === step ? "border-2 border-[#c9a84c]" : "border-2 border-transparent"}`}
                                            >
                                                {i + 1 < step ? "✓" : i + 1}
                                            </div>
                                            <span
                                                className={`text-[9px] tracking-wider uppercase ${i + 1 <= step ? "text-[#c9a84c]" : "text-[#333]"
                                                    }`}
                                            >
                                                {label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-0.5 bg-[#1e1e1e] rounded-full overflow-hidden">
                                    <div
                                        className="step-line h-full bg-gradient-to-r from-[#c9a84c] to-[#e8cc7a]"
                                        style={{ width: `${((step - 1) / 3) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Steps */}
                            {step === 1 && <PersonalInfoStep form={form} update={update} errors={errors} />}
                            {step === 2 && <DateTimeStep form={form} update={update} errors={errors} />}
                            {step === 3 && <ConfirmStep form={form} />}

                            {/* Navigation */}
                            <div className="flex gap-2.5 mt-7">
                                {step > 1 && (
                                    <button
                                        onClick={handleBack}
                                        className="flex-1 py-3.5 rounded-xl border border-[#252525] bg-transparent text-[#666] text-sm font-medium transition-all hover:text-[#888]"
                                    >
                                        Atrás
                                    </button>
                                )}
                                <button
                                    onClick={step < 4 ? handleNext : handleSubmit}
                                    className="gold-btn flex-[2] py-3.5 rounded-xl border-none text-dark text-sm font-bold tracking-wide"
                                >
                                    {step < 4 ? "Continuar →" : "Agendar Cita"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <SuccessScreen form={form} onReset={handleReset} />
                    )}
                </div>

                {/* Footer */}
                <p className="text-center mt-6 text-[#333] text-xs">
                    📍 Barranquilla, Colombia · Lun–Sáb 8AM–7PM
                </p>
            </div>
        </div>
    );
};

export default BarbershopForm;
