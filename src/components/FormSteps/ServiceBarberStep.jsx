import React from 'react';
import { services, barbers } from '../../data/barbershopData';

const ServiceBarberStep = ({ form, update, errors }) => {
    return (
        <div className="fade-up">
            <h2 className="font-display text-2xl text-[#f5f0e8] m-0">Elige tu servicio</h2>
            <p className="text-[#555] text-[13px] mt-1 mb-5">Selecciona el servicio y tu barbero preferido.</p>

            <div className="grid grid-cols-2 gap-2 mb-1.5">
                {services.map(s => (
                    <div
                        key={s.id}
                        className={`service-card rounded-xl px-3.5 py-3 ${form.service === s.id ? "selected" : ""}`}
                        onClick={() => update("service", s.id)}
                    >
                        <div className="text-[13px] text-[#f5f0e8] font-medium mb-1">{s.label}</div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#c9a84c] text-[13px] font-bold">{s.price}</span>
                            <span className="text-[#555] text-[11px]">{s.duration}</span>
                        </div>
                    </div>
                ))}
            </div>
            {errors.service && <p className="text-[#c0392b] text-xs mb-3">{errors.service}</p>}

            <div className="border-t border-[#1e1e1e] pt-5 mt-4">
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#666] mb-3">
                    Barbero
                </label>
                <div className="flex flex-col gap-2">
                    {barbers.map(b => (
                        <div
                            key={b.id}
                            className={`barber-card rounded-xl px-4 py-3 flex justify-between items-center ${form.barber === b.id ? "selected" : ""
                                }`}
                            onClick={() => update("barber", b.id)}
                        >
                            <div>
                                <div className="text-sm text-[#f5f0e8] font-medium">{b.name}</div>
                                <div className="text-xs text-[#555]">{b.specialty}</div>
                            </div>
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} className="text-[#c9a84c] text-[10px]">★</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {errors.barber && <p className="text-[#c0392b] text-xs mt-2">{errors.barber}</p>}
            </div>
        </div>
    );
};

export default ServiceBarberStep;
