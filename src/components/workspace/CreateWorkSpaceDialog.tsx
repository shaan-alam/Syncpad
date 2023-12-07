import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/utils/api";
import { ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

type CreateWorkspaceDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateWorkspaceDialog = ({
  open,
  setOpen,
}: CreateWorkspaceDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");

  const { isLoading, mutate } = api.workspace.createWorkspace.useMutation({
    onSuccess: () => {
      setOpen(false);
    }
  });

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
    e,
  ) => {
    e.preventDefault();

    if (name.trim() === "") {
      return toast({
        title: "Error",
        description: "Please provide a name for the Workspace!",
      });
    }

    mutate({ name });
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger>
        New Workspace
      </DialogTrigger>
      <DialogContent className='border-primary-foreground'>
        <DialogHeader>
          <DialogTitle>New Workspace</DialogTitle>
          <DialogDescription>
            Create a new Workspace to manage your folders
          </DialogDescription>
          <div className="mt-8">
            <form onSubmit={onFormSubmit}>
              <Label htmlFor="name">Workspace Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className='my-2'/>
              <Button>
                Next
                {!isLoading && <ChevronRight size={15} className="ml-2" />}
                {isLoading && <Loader2 size={15} className="ml-2" />}
              </Button>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
