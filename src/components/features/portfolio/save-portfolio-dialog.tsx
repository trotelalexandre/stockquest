import { useState } from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePortfolio } from "@/providers/portfolio-provider";

interface SavePortfolioDialogProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SavePortfolioDialog({
  open,
  onOpenChange,
}: SavePortfolioDialogProps) {
  const [portfolioName, setPortfolioName] = useState("");

  const { savePortfolio } = usePortfolio();

  const handleSave = () => {
    if (!portfolioName.trim()) return;

    if (portfolioName.trim()) {
      savePortfolio(portfolioName);
      setPortfolioName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Portfolio</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <Input
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
            placeholder="Enter portfolio name"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setPortfolioName("");
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!portfolioName.trim()}
            className="game-button game-button-primary"
          >
            <Check className="mr-2 h-4 w-4" />
            Save Portfolio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
