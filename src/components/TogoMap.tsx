
export default function TogoMap() {
    return (
        <div className="relative w-full h-[750px] flex items-center justify-center bg-gray-50/50 rounded-3xl border border-slate-100 shadow-inner overflow-hidden">
            <img
                src="/images/togo_map_bg.png"
                alt="Carte des régions du Togo"
                className="absolute w-full h-full object-contain scale-110"
            />
        </div>
    );
}

