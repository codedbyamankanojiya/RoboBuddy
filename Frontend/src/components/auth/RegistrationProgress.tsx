type Step = { id: number; title: string };

type Props = {
    steps: Step[];
    currentStep: number;
};

export function RegistrationProgress({ steps, currentStep }: Props) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1 last:flex-none">
                        {/* Step circle */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 ${step.id < currentStep
                                        ? "border-emerald-500 bg-emerald-500 text-white"
                                        : step.id === currentStep
                                            ? "border-violet-500 bg-violet-500/20 text-violet-400 shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                                            : "border-white/20 bg-white/5 text-white/30"
                                    }`}
                            >
                                {step.id < currentStep ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    step.id
                                )}
                            </div>
                            <span
                                className={`mt-2 text-xs font-medium transition-colors duration-300 ${step.id <= currentStep ? "text-white/80" : "text-white/30"
                                    }`}
                            >
                                {step.title}
                            </span>
                        </div>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div className="flex-1 mx-3 mt-[-1.25rem]">
                                <div className="h-0.5 rounded-full bg-white/10 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                                        style={{ width: step.id < currentStep ? "100%" : "0%" }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
