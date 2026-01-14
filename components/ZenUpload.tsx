import React, { useState, useRef, useMemo } from 'react';
import { Upload, ShieldCheck, Globe, Zap, Loader2, ArrowLeft, MapPin } from 'lucide-react';
import { UploadState, HistoryItem, AudienceScope, AssetType, Modality } from '../types';
import { ingestAsset } from '../services/ingestion';
import { InputMethod, getAvailableAssets } from '../utils/ingestionLogic';
import { cn } from '../utils';

interface ZenUploadProps {
    uploadState: UploadState;
    setUploadState: (state: UploadState) => void;
    onAnalyze: () => void;
    isAnalyzing: boolean;
    history: HistoryItem[];
    progress?: number;
}

// --- PRIMITIVES ---

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("glass-panel rounded-2xl overflow-visible shadow-glass transition-all", className)}>
        {children}
    </div>
);

const SelectionPill = ({ label, icon: Icon, selected, onClick }: any) => {
    return (
        <button onClick={onClick} className={cn(
            "flex items-center gap-2.5 px-5 py-4 rounded-xl text-sm font-semibold transition-all duration-300 w-full justify-center group relative overflow-hidden",
            selected
                ? "bg-gradient-to-br from-brand-primary to-brand-danger text-white shadow-lg shadow-brand-primary/30 transform scale-[1.02]"
                : "bg-white/50 border border-white/40 text-brand-text-muted hover:bg-white hover:text-brand-text-main hover:shadow-md"
        )}>
            <Icon className={cn("w-5 h-5 transition-colors", selected ? "text-white" : "text-brand-text-light group-hover:text-brand-primary")} />
            <span className="relative z-10">{label}</span>
            {selected && <div className="absolute inset-0 bg-white/20 blur-xl opacity-50 animate-pulse"></div>}
        </button>
    );
};

// ... Select component remains similar but styled ...
const Select = ({ options, value, onChange, placeholder = "Select..." }: { options: { label: string; value: string }[], value: string, onChange: (val: string) => void, placeholder?: string }) => (
    <div className="relative">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/40 text-brand-text-main text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/50 appearance-none cursor-pointer backdrop-blur-sm transition-all hover:bg-white/80"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
        >
            <option value="" disabled className="text-gray-400">{placeholder}</option>
            {options.map(opt => (
                <option key={opt.value} value={opt.value} className="text-gray-900">{opt.label}</option>
            ))}
        </select>
    </div>
);

const REGION_OPTIONS = [
    { label: "North America", value: "North America" },
    { label: "Europe", value: "Europe" },
    { label: "Asia Pacific", value: "Asia Pacific" },
    { label: "Latin America", value: "Latin America" },
    { label: "Middle East & Africa", value: "Middle East & Africa" },
];

export const ZenUpload: React.FC<ZenUploadProps> = ({ uploadState, setUploadState, onAnalyze, isAnalyzing, progress = 0 }) => {
    const [inputMethod, setInputMethod] = useState<InputMethod>(InputMethod.FILE);
    const [isHoveringDrop, setIsHoveringDrop] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Explicit step state
    const [activeStep, setActiveStep] = useState(1);

    const availableAssets = useMemo(() => getAvailableAssets(uploadState.audienceScope, inputMethod, uploadState.file?.name), [uploadState.audienceScope, inputMethod, uploadState.file?.name]);

    const handleFile = async (file: File) => {
        try {
            const asset = await ingestAsset(file);

            // Map ingested content to appropriate state fields so App.tsx validation passes
            let newText = '';
            let newBase64 = '';
            const ext = file.name.split('.').pop()?.toLowerCase();

            // PDF, Images, Videos -> Base64
            if (asset.modality === Modality.VISUAL_DOMINANT || asset.modality === Modality.VIDEO || ext === 'pdf') {
                newBase64 = asset.content as string;
            }
            // DOCX, PPTX, Text -> TextInput (Extracted Text)
            else {
                newText = asset.content as string;
            }

            setUploadState({
                ...uploadState,
                file,
                ingestedAsset: asset,
                textInput: newText,
                fileBase64: newBase64,
                htmlPreview: asset.htmlPreview,
                mimeType: file.type
            });
            setActiveStep(2);
        } catch (e) {
            console.error(e);
        }
    };

    const handleScopeSelect = (scope: AudienceScope) => {
        setUploadState({ ...uploadState, audienceScope: scope, assetType: '' as AssetType });
        setActiveStep(3);
    };

    const handleAssetSelect = (type: AssetType) => {
        setUploadState({ ...uploadState, assetType: type });
        setActiveStep(4);
    };

    const handleRegionSelect = (region: string) => {
        setUploadState({ ...uploadState, region });
        // Only advance for Global. For specific regional toggle, we wait for Continue button
        if (region === "Global") {
            setActiveStep(5);
        }
    };

    const handleRegionalToggle = () => {
        setUploadState({ ...uploadState, region: "North America" });
    };

    const goBack = () => {
        setActiveStep(prev => Math.max(1, prev - 1));
    };

    const stepLabels = ["Content", "Scope", "Asset Type", "Region", "Review"];

    return (
        <div className="w-full flex flex-col items-center justify-center p-4 md:p-6 min-h-[80vh]">
            <div className="w-full max-w-xl relative">

                {/* Header */}
                <div className="flex items-center justify-between mb-6 md:mb-8 animate-fade-in-up">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-danger flex items-center justify-center shadow-lg relative z-10">
                                <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight text-brand-text-main">New Analysis</h1>
                            <p className="text-[10px] md:text-xs text-brand-text-muted font-medium">AI-Powered Compliance Check</p>
                        </div>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center justify-between mb-6 md:mb-8 px-2 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-brand-border/50 -z-10 -translate-y-1/2 rounded-full"></div>
                    <div
                        className="absolute left-0 top-1/2 h-0.5 bg-brand-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((activeStep - 1) / 4) * 100}%` }}
                    ></div>

                    {[1, 2, 3, 4, 5].map(step => (
                        <div key={step} className="flex flex-col items-center gap-2 bg-brand-base p-1 rounded-full z-10">
                            <div className={cn(
                                "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ring-4 ring-brand-base",
                                step < activeStep ? "bg-brand-primary scale-110" :
                                    step === activeStep ? "bg-brand-primary scale-125 shadow-glow" : "bg-brand-border"
                            )} />
                        </div>
                    ))}
                </div>

                {/* Main Card */}
                <div className="perspective-1000">
                    <Card className="p-5 md:p-8 mb-6 md:mb-8 border border-white/60 animate-scale-in backdrop-blur-xl bg-white/70">

                        <div className="mb-4 md:mb-6 flex justify-between items-end">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-text-main">{stepLabels[activeStep - 1]}</h2>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-text-muted/60 bg-white/50 px-2 py-1 rounded-md">Step 0{activeStep}</span>
                        </div>

                        {/* Step 1: Content */}
                        {activeStep === 1 && (
                            <div className="animate-fade-in">
                                <div className="flex bg-white/50 p-1 rounded-xl mb-6 border border-white/60">
                                    {[InputMethod.FILE, InputMethod.TEXT].map(m => (
                                        <button key={m} onClick={() => setInputMethod(m)} className={cn(
                                            "flex-1 py-2 md:py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all rounded-lg",
                                            inputMethod === m ? "bg-white text-brand-primary shadow-sm" : "text-brand-text-light hover:text-brand-text-muted"
                                        )}>
                                            {m === InputMethod.FILE ? "File Upload" : "Direct Text"}
                                        </button>
                                    ))}
                                </div>

                                {inputMethod === InputMethod.FILE ? (
                                    <div
                                        className={cn(
                                            "h-[200px] md:h-[220px] rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer group relative overflow-hidden",
                                            isHoveringDrop
                                                ? "border-brand-primary bg-brand-primary/5 scale-[1.02]"
                                                : "border-brand-border hover:border-brand-primary/50 hover:bg-white/40"
                                        )}
                                        onDragOver={(e) => { e.preventDefault(); setIsHoveringDrop(true); }}
                                        onDragLeave={() => setIsHoveringDrop(false)}
                                        onDrop={(e) => { e.preventDefault(); setIsHoveringDrop(false); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); }}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

                                        <div className={cn(
                                            "w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm",
                                            isHoveringDrop ? "bg-brand-primary text-white" : "bg-white text-brand-primary group-hover:scale-110"
                                        )}>
                                            <Upload className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                                        </div>
                                        <div className="text-center z-10 px-4">
                                            <p className="text-brand-text-main font-semibold text-base md:text-lg">Drop your file here</p>
                                            <p className="text-brand-text-muted text-xs md:text-sm mt-1">or click to browse</p>
                                        </div>

                                        {/* Decor */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 animate-fade-in">
                                        <textarea
                                            className="w-full h-[200px] md:h-[220px] bg-white/50 border border-white/60 rounded-2xl p-4 md:p-6 text-xs md:text-sm font-mono text-brand-text-main resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all placeholder:text-brand-text-light"
                                            placeholder="Paste your content text here..."
                                            value={uploadState.textInput}
                                            onChange={(e) => setUploadState({ ...uploadState, textInput: e.target.value })}
                                            autoFocus
                                        />
                                        {uploadState.textInput && (
                                            <button onClick={() => setActiveStep(2)} className="w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold text-xs md:text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-brand-primary/30 transition-all transform hover:-translate-y-0.5">
                                                Continue
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2: Scope */}
                        {activeStep === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 animate-fade-in-up">
                                <SelectionPill label="Internal" icon={ShieldCheck} selected={uploadState.audienceScope === AudienceScope.INTERNAL} onClick={() => handleScopeSelect(AudienceScope.INTERNAL)} />
                                <SelectionPill label="External" icon={Globe} selected={uploadState.audienceScope === AudienceScope.EXTERNAL} onClick={() => handleScopeSelect(AudienceScope.EXTERNAL)} />
                            </div>
                        )}

                        {/* Step 3: Asset Type */}
                        {activeStep === 3 && (
                            <div className="space-y-6 max-h-[320px] overflow-y-auto pr-2 animate-fade-in-up custom-scrollbar">
                                {Object.entries(availableAssets).map(([domain, items], idx) => (
                                    <div key={domain} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                        <span className="text-[10px] font-bold text-brand-text-light uppercase tracking-widest mb-2 md:mb-3 block pl-1">{domain}</span>
                                        <div className="flex flex-wrap gap-2">
                                            {items.map(opt => (
                                                <button key={opt.value} onClick={() => handleAssetSelect(opt.value as AssetType)} className={cn(
                                                    "px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 border",
                                                    uploadState.assetType === opt.value
                                                        ? "bg-brand-text-main text-white border-brand-text-main shadow-md transform scale-105"
                                                        : "bg-white/60 text-brand-text-muted border-transparent hover:bg-white hover:text-brand-text-main hover:shadow-sm"
                                                )}>
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Step 4: Region */}
                        {activeStep === 4 && (
                            <div className="space-y-5 animate-fade-in-up">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <button
                                        onClick={() => handleRegionSelect("Global")}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3 py-5 md:py-6 rounded-2xl border transition-all duration-300 group",
                                            uploadState.region === "Global"
                                                ? "bg-brand-primary/5 border-brand-primary text-brand-primary shadow-inner"
                                                : "bg-white/50 border-white/60 text-brand-text-muted hover:bg-white hover:shadow-lg hover:-translate-y-1"
                                        )}
                                    >
                                        <Globe className={cn("w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:scale-110", uploadState.region === "Global" ? "text-brand-primary" : "text-brand-text-light")} strokeWidth={1.5} />
                                        <span className="font-semibold text-sm md:text-base">Global</span>
                                    </button>
                                    <button
                                        onClick={handleRegionalToggle}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-3 py-5 md:py-6 rounded-2xl border transition-all duration-300 group",
                                            uploadState.region && uploadState.region !== "Global"
                                                ? "bg-brand-primary/5 border-brand-primary text-brand-primary shadow-inner"
                                                : "bg-white/50 border-white/60 text-brand-text-muted hover:bg-white hover:shadow-lg hover:-translate-y-1"
                                        )}
                                    >
                                        <MapPin className={cn("w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:scale-110", uploadState.region && uploadState.region !== "Global" ? "text-brand-primary" : "text-brand-text-light")} strokeWidth={1.5} />
                                        <span className="font-semibold text-sm md:text-base">Regional</span>
                                    </button>
                                </div>

                                {uploadState.region && uploadState.region !== "Global" && (
                                    <div className="pt-2 animate-fade-in-up">
                                        <label className="text-[10px] md:text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2 block pl-1">Specific Region</label>
                                        <Select
                                            options={REGION_OPTIONS}
                                            value={uploadState.region}
                                            onChange={(val) => handleRegionSelect(val)}
                                            placeholder="Select region..."
                                        />
                                        {uploadState.region && (
                                            <button
                                                onClick={() => setActiveStep(5)}
                                                className="w-full mt-6 py-3 md:py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold text-xs md:text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-brand-primary/30 transition-all transform hover:-translate-y-0.5 animate-scale-in"
                                            >
                                                Continue
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 5: Review & Analyze */}
                        {activeStep === 5 && (
                            <div className="text-center space-y-6 md:space-y-8 animate-fade-in-up">

                                <div className="bg-white/40 rounded-2xl p-1 border border-white/50">
                                    {[
                                        { label: "Content", val: uploadState.file?.name || "Text input" },
                                        { label: "Scope", val: uploadState.audienceScope },
                                        { label: "Type", val: uploadState.assetType },
                                        { label: "Region", val: uploadState.region }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 border-b last:border-0 border-white/50 hover:bg-white/40 transition-colors rounded-lg">
                                            <span className="text-brand-text-muted text-[10px] md:text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                            <span className="text-brand-text-main text-xs md:text-sm font-semibold truncate max-w-[150px] md:max-w-[200px]">{item.val}</span>
                                        </div>
                                    ))}
                                </div>

                                {isAnalyzing ? (
                                    <div className="space-y-4">
                                        <div className="h-14 md:h-16 w-full bg-white rounded-xl border border-brand-border relative overflow-hidden flex items-center justify-center shadow-inner">
                                            <div
                                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-primary/20 to-brand-primary/10 transition-all duration-500 ease-out"
                                                style={{ width: `${progress}%` }}
                                            />
                                            <div className="absolute inset-y-0 left-0 w-full bg-[url('/stripes.png')] opacity-10 animate-marquee"></div> {/* Optional generic texture */}

                                            <div className="relative z-10 flex items-center gap-3">
                                                <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />
                                                <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-brand-text-main">
                                                    Analyzing {progress}%
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-[10px] md:text-xs text-center text-brand-text-muted animate-pulse font-medium">
                                            AI is validating your content against global standards...
                                        </p>
                                    </div>
                                ) : (
                                    <button onClick={onAnalyze} className="w-full py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-glow hover:-translate-y-1 active:scale-95 group">
                                        <Zap className="w-5 h-5 group-hover:fill-current" />
                                        Run Analysis
                                    </button>
                                )}
                            </div>
                        )}
                    </Card>
                </div>

                {/* Back Button */}
                {
                    activeStep > 1 && !isAnalyzing && (
                        <button onClick={goBack} className="flex items-center gap-2 text-brand-text-light hover:text-brand-text-main transition-colors text-[10px] md:text-xs font-bold uppercase tracking-widest mx-auto animate-fade-in opacity-70 hover:opacity-100">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Previous
                        </button>
                    )
                }
            </div >
        </div >
    );
};
