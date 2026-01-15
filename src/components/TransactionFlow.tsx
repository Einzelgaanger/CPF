import { useState } from "react";
import { transactionSteps, TransactionStep } from "@/data/pendingBills";
import { Check, Clock, ArrowRight, Users, Building, Landmark, Briefcase, TrendingUp } from "lucide-react";

const entityIcons = {
  supplier: Users,
  mda: Building,
  treasury: Landmark,
  spv: Briefcase,
  investor: TrendingUp,
};

const entityColors = {
  supplier: 'bg-destructive/80 hover:bg-destructive',
  mda: 'bg-accent hover:bg-accent/90',
  treasury: 'bg-primary hover:bg-primary/90',
  spv: 'bg-secondary hover:bg-secondary/90',
  investor: 'bg-success hover:bg-success/90',
};

const TransactionFlow = () => {
  const [selectedStep, setSelectedStep] = useState<TransactionStep | null>(transactionSteps[3]);

  const getStepIcon = (status: string) => {
    if (status === 'completed') return <Check className="w-4 h-4" />;
    if (status === 'active') return <Clock className="w-4 h-4" />;
    return <span className="text-sm font-bold">{selectedStep?.step}</span>;
  };

  const getStepClass = (status: string) => {
    if (status === 'completed') return 'step-completed';
    if (status === 'active') return 'step-active pulse-glow';
    return 'step-pending';
  };

  return (
    <section id="workflow" className="py-8">
      <div className="glass-card p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Transaction Process Flow
        </h2>
        <p className="text-muted-foreground mb-8">
          Key steps in the securitization settlement process
        </p>

        {/* Flow Diagram */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { type: 'supplier', label: 'Suppliers', sublabel: '(Originator)' },
            { type: 'mda', label: 'MDAs', sublabel: '(Obligor)' },
            { type: 'treasury', label: 'National Treasury', sublabel: '(Fiscal Agent)' },
            { type: 'spv', label: 'SPV', sublabel: '(Issuer)' },
            { type: 'investor', label: 'Investors', sublabel: '' },
          ].map((entity, index) => {
            const Icon = entityIcons[entity.type as keyof typeof entityIcons];
            return (
              <div key={entity.type} className="flex items-center gap-2">
                <div 
                  className={`flow-node flex-1 ${entityColors[entity.type as keyof typeof entityColors]} text-white`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-semibold">{entity.label}</div>
                  {entity.sublabel && (
                    <div className="text-xs opacity-80">{entity.sublabel}</div>
                  )}
                </div>
                {index < 4 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border hidden md:block" />
          
          <div className="space-y-4">
            {transactionSteps.map((step) => (
              <div
                key={step.step}
                className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedStep?.step === step.step 
                    ? 'bg-muted/50 border border-primary/30' 
                    : 'hover:bg-muted/30'
                }`}
                onClick={() => setSelectedStep(step)}
              >
                <div className={`${getStepClass(step.status)} shrink-0 relative z-10`}>
                  {step.status === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : step.status === 'active' ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <span>{step.step}</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-semibold text-foreground">
                      Step {step.step}: {step.title}
                    </h4>
                    <span className={`badge-status ${
                      step.status === 'completed' ? 'badge-verified' :
                      step.status === 'active' ? 'badge-processing' :
                      'badge-pending'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md ${
                    entityColors[step.entityType]
                  } text-white`}>
                    {step.entity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-border">
          <span className="text-sm text-muted-foreground">Legend:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-accent rounded" />
            <span className="text-xs text-muted-foreground">Action Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-destructive rounded" />
            <span className="text-xs text-muted-foreground">Cash Flow Movement</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionFlow;
