import { useState } from 'react';
import { motion } from 'framer-motion';

const RegionPath = ({ d, name, color, isActive, onClick }: any) => {
    return (
        <motion.path
            d={d}
            fill={isActive ? color : '#E2E8F0'}
            stroke="white"
            strokeWidth="2"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1, fill: isActive ? color : '#E2E8F0' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{
                scale: 1.02,
                fill: color,
                cursor: 'pointer',
                filter: "drop-shadow(0px 5px 10px rgba(0,0,0,0.2))"
            }}
            onClick={onClick}
            className="transition-colors duration-300 outline-none"
        />
    );
};

export default function TogoMap({ onRegionSelect }: { onRegionSelect: (region: string) => void }) {
    const [activeRegion, setActiveRegion] = useState<string | null>(null);

    const regions = [
        {
            id: 'savanes',
            name: 'Région des Savanes',
            color: '#F59E0B', // Amber
            // Top part of Togo
            path: "M 120 10 L 180 15 L 170 80 L 100 70 L 120 10 Z"
        },
        {
            id: 'kara',
            name: 'Région de la Kara',
            color: '#EF4444', // Red
            // Below Savanes
            path: "M 100 70 L 170 80 L 180 130 L 90 140 L 100 70 Z"
        },
        {
            id: 'centrale',
            name: 'Région Centrale',
            color: '#10B981', // Green
            // Middle
            path: "M 90 140 L 180 130 L 190 220 L 80 230 L 90 140 Z"
        },
        {
            id: 'plateaux',
            name: 'Région des Plateaux',
            color: '#3B82F6', // Blue
            // Below Centrale
            path: "M 80 230 L 190 220 L 180 340 L 70 350 L 80 230 Z"
        },
        {
            id: 'maritime',
            name: 'Région Maritime',
            color: '#8B5CF6', // Purple
            // Bottom
            path: "M 70 350 L 180 340 L 160 420 L 90 420 L 70 350 Z"
        }
    ];

    const handleRegionClick = (region: any) => {
        setActiveRegion(region.name);
        onRegionSelect(region);
    };

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center bg-blue-50/30 rounded-3xl border border-blue-100/50 p-8">
            <svg viewBox="0 0 300 450" className="h-full drop-shadow-2xl">
                {regions.map((region) => (
                    <RegionPath
                        key={region.id}
                        d={region.path}
                        name={region.name}
                        color={region.color}
                        isActive={activeRegion === region.name}
                        onClick={() => handleRegionClick(region)}
                    />
                ))}
            </svg>

            {/* Tooltip / Legend Overlay */}
            <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs">
                <h4 className="font-bold text-gray-800 mb-2">Carte Interactive</h4>
                <p className="text-xs text-gray-500">Cliquez sur une région pour voir ses détails et ses représentants.</p>
                {activeRegion && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                    >
                        <div className="font-bold text-blue-600">{activeRegion}</div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
