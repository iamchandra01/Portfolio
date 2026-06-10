import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
export function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) { return <Card className="glass p-6"><div className="mb-4 grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-5" /></div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></Card>; }
