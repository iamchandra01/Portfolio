import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
export function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) { return <Card className="p-5"><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">{label}</p><Icon className="size-5 text-primary" /></div><p className="mt-3 text-3xl font-bold tracking-tight">{value}</p></Card>; }
