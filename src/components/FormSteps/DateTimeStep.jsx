import React from 'react';
import { Calendar, Note } from "@phosphor-icons/react";
import { timeSlots } from '../../data/barbershopData';

const DateTimeStep = ({ form, update, errors }) => {
    return (
        <div className="fade-up">
            <h2 className="font-display text-2xl text-[#f5f0e8] m-0">Fecha y hora</h2>
            <p className="text-[#555] text-[13px] mt-1 mb-5">Escoge cuándo quieres tu cita.</p>

            <div className="mb-5">
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#666] mb-2">
                    Fecha
                </label>
                <div className="relative">
                    <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#444]">
                        <Calendar size={20} />
                    </div>
                    <input
                        type="date"
                        value={form.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={e => update("date", e.target.value)}
                        className={`w-full pl-[46px] pr-4 py-[14px] bg-[#161616] border rounded-xl color-[#f5f0e8] text-sm outline-none transition-all ${errors.date ? "border-[#c0392b]" : "border-[#252525]"
                            }`}
                    />
                </div>
                {errors.date && <p className="text-[#c0392b] text-xs mt-1">{errors.date}</p>}
            </div>

            <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#666] mb-2.5">
                    Hora disponible
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                    {timeSlots.map(t => (
                        <button
                            key={t}
                            className={`time-btn py-[9px] px-1 text-[12px] rounded-lg bg-transparent border-[#252525] text-[#888] cursor-pointer ${form.time === t ? "selected" : ""
                                }`}
                            onClick={() => update("time", t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                {errors.time && <p className="text-[#c0392b] text-xs mt-2">{errors.time}</p>}
            </div>

            <div className="mt-5">
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#666] mb-2">
                    Notas adicionales (opcional)
                </label>
                <div className="relative">
                    <div className="absolute left-[14px] top-[14px] text-[#444]">
                        <Note size={20} />
                    </div>
                    <textarea
                        value={form.notes}
                        onChange={e => update("notes", e.target.value)}
                        placeholder="Ej: quiero el corte con mucho volumen arriba..."
                        rows={3}
                        className="w-full pl-[46px] pr-4 py-[14px] bg-[#161616] border border-[#252525] rounded-xl color-[#f5f0e8] text-[13px] outline-none resize-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default DateTimeStep;
