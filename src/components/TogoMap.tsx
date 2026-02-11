import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LabelArea = ({ x, y, width, height, isActive, onMouseEnter, onMouseLeave }: any) => {
    return (
        <motion.rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="#FFFFFF"
            initial={{ opacity: 0 }}
            animate={{
                opacity: isActive ? 0.2 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer pointer-events-auto"
            rx="6"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    );
};

export default function TogoMap({ onHover }: { onHover: (region: any) => void }) {
    const { t } = useTranslation();
    const [activeRegion, setActiveRegion] = useState<string | null>(null);

    const regions = [
        {
            id: 'savanes',
            label: t('togo_map.label_savanes'),
            org: 'ONG CDD',
            description: t('togo_map.savanes_desc'),
            bgClass: 'bg-orange-50',
            borderClass: 'border-orange-100',
            accentClass: 'text-orange-600',
            x: 285, y: 92, width: 85, height: 35
        },
        {
            id: 'kara',
            label: t('togo_map.label_kara'),
            org: 'ONG AJT',
            description: t('togo_map.kara_desc'),
            bgClass: 'bg-blue-50',
            borderClass: 'border-blue-100',
            accentClass: 'text-blue-600',
            x: 130, y: 158, width: 75, height: 35
        },
        {
            id: 'centrale',
            label: t('togo_map.label_centrale'),
            org: 'ONG ADESCO',
            description: t('togo_map.centrale_desc'),
            bgClass: 'bg-emerald-50',
            borderClass: 'border-emerald-100',
            accentClass: 'text-emerald-600',
            x: 322, y: 208, width: 83, height: 35
        },
        {
            id: 'plateaux',
            label: t('togo_map.label_plateaux'),
            org: 'ONG ODIAE',
            description: t('togo_map.plateaux_desc'),
            bgClass: 'bg-blue-50',
            borderClass: 'border-blue-100',
            accentClass: 'text-blue-600',
            x: 147, y: 258, width: 73, height: 35
        },
        {
            id: 'maritime',
            label: t('togo_map.label_maritime'),
            org: 'ONG FIADI',
            description: t('togo_map.maritime_desc'),
            bgClass: 'bg-indigo-50',
            borderClass: 'border-indigo-100',
            accentClass: 'text-indigo-600',
            x: 322, y: 320, width: 83, height: 35
        },
        {
            id: 'lome',
            label: t('togo_map.label_lome'),
            org: 'ONG La CDE',
            description: t('togo_map.lome_desc'),
            bgClass: 'bg-blue-50',
            borderClass: 'border-blue-100',
            accentClass: 'text-blue-600',
            x: 182, y: 360, width: 78, height: 35
        }
    ];


    const handleMouseEnter = (region: any) => {
        setActiveRegion(region.id);
        onHover(region);
    };

    const handleMouseLeave = () => {
        setActiveRegion(null);
        onHover(null);
    };

    return (
        <div className="relative w-full h-[750px] flex items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-inner overflow-hidden">
            <img
                src="/images/togo_map_bg.png"
                alt="Carte des régions du Togo"
                className="absolute w-full h-full object-contain scale-110"
            />

            <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                {regions.map((region) => (
                    <LabelArea
                        key={region.id}
                        x={region.x}
                        y={region.y}
                        width={region.width}
                        height={region.height}
                        isActive={activeRegion === region.id}
                        onMouseEnter={() => handleMouseEnter(region)}
                        onMouseLeave={handleMouseLeave}
                    />
                ))}
            </svg>
        </div>
    );
}

