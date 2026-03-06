import React from 'react';
import { Star } from "@phosphor-icons/react";

const ConfirmStep = ({ form }) => {
    const summaryData = [
        ["Cliente", form.name],
        ["Teléfono", form.phone],
        ["Fecha", form.date],
        ["Hora", form.time],
    ];

    return (
        <div className="fade-up">
            <h2 className="font-display text-2xl text-[#f5f0e8] m-0">Confirmar cita</h2>
            <p className="text-[#555] text-[13px] mt-1 mb-5">Revisa los detalles antes de agendar.</p>

            <div className="bg-[#0d0d0d] rounded-2xl p-5 border border-[#1e1e1e] mb-4">
                <div className="flex items-center gap-2 mb-4 pb-3.5 border-b border-[#1e1e1e]">
                    <div className="text-[#c9a84c]"><Star size={20} weight="fill" /></div>
                    <span className="font-display text-[#c9a84c] text-sm">Resumen de tu cita</span>
                </div>

                <div className="space-y-2">
                    {summaryData.map(([label, value]) => (
                        <div key={label} className="flex justify-between items-start py-2 border-b border-[#181818] last:border-0">
                            <span className="text-[#444] text-[12px] shrink-0">{label}</span>
                            <span className="text-[#ccc] text-[13px] text-right max-w-[60%]">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConfirmStep;
