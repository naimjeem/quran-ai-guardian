
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BeginnerModeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const BeginnerModeToggle: React.FC<BeginnerModeToggleProps> = ({ enabled, onToggle }) => {
  return (
    <div className="flex items-center space-x-2 border p-3 rounded-md bg-blue-50/30">
      <Switch 
        id="beginner-mode" 
        checked={enabled}
        onCheckedChange={onToggle}
      />
      <div className="flex items-center">
        <Label htmlFor="beginner-mode" className="font-medium text-tarteel-primary">
          Beginner Mode
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[220px] text-xs">
                Beginner mode provides more lenient scoring and simplified feedback for those new to Arabic recitation.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {enabled && (
        <span className="text-xs text-blue-700">Active</span>
      )}
    </div>
  );
};

export default BeginnerModeToggle;
