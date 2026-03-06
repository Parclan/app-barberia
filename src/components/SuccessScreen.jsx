import React from 'react';
import { CheckCircle } from "@phosphor-icons/react";

const SuccessScreen = ({ form, onReset }) => {
    const confirmationDetails = [
        ["Cliente", form.name],
        ["Fecha", form.date],
        ["Hora", form.time],
    ];

    return (
        <div className="text-center fade-up font-body">
            <div className="scale-in inline-block mb-6 text-[#c9a84c]">
                <CheckCircle size={64} weight="fill" />
            </div>
            <h2 className="font-display text-4xl mb-3 text-[#f5f0e8]">
                ¡Cita Confirmada!
            </h2>
            <p className="text-[#888] mb-6">Te esperamos en la barbería</p>

            <div className="bg-[#161616] rounded-2xl p-6 text-left space-y-3 mb-8 border border-[#2a2a2a]">
                {confirmationDetails.map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                        <span className="text-[#555] text-[13px]">{label}</span>
                        <span className="text-[#f5f0e8] text-[13px] font-medium">{value}</span>
                    </div>
                ))}
            </div>

            <button
                onClick={onReset}
                className="gold-btn w-full py-3.5 px-8 font-bold rounded-xl text-dark text-sm"
            >
                Nueva Cita
            </button>
        </div>
    );
};

export default SuccessScreen;
