import React from 'react';
import { User, Phone } from "@phosphor-icons/react";

const PersonalInfoStep = ({ form, update, errors }) => {
    return (
        <div className="fade-up space-y-5">
            <h2 className="font-display text-2xl text-[#f5f0e8] m-0">¿Quién eres?</h2>
            <p className="text-[#555] text-[13px] mt-1">Cuéntanos un poco sobre ti para tu reservación.</p>

            <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#666] mb-2">
                    Nombre completo
                </label>
                <div className="relative">
                    <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#444]">
                        <User size={20} />
                    </div>
                    <input
                        type="text"
                        value={form.name}
                        onChange={e => update("name", e.target.value)}
                        placeholder="Tu nombre"
                        className={`w-full pl-[46px] pr-4 py-[14px] bg-[#161616] border rounded-f12 color-[#f5f0e8] text-sm outline-none transition-all ${errors.name ? "border-[#c0392b]" : "border-[#252525]"
                            }`}
                    />
                </div>
                {errors.name && <p className="text-[#c0392b] text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#666] mb-2">
                    Teléfono
                </label>
                <div className="relative">
                    <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#444]">
                        <Phone size={20} />
                    </div>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={e => update("phone", e.target.value)}
                        placeholder="+57 300 000 0000"
                        className={`w-full pl-[46px] pr-4 py-[14px] bg-[#161616] border rounded-f12 color-[#f5f0e8] text-sm outline-none transition-all ${errors.phone ? "border-[#c0392b]" : "border-[#252525]"
                            }`}
                    />
                </div>
                {errors.phone && <p className="text-[#c0392b] text-xs mt-1">{errors.phone}</p>}
            </div>
        </div>
    );
};

export default PersonalInfoStep;
