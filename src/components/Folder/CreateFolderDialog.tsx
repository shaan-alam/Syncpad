import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Folder, Loader2, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Button } from "../ui/button";
import { api } from "@/utils/api";
import { useAtom } from "jotai";
import { workspaceAtom } from "@/store";

const CreateFolderDialog = ({ children }: PropsWithChildren) => {
  const { isLoading, mutate } = api.folder.createFolder.useMutation();
  const [workspace] = useAtom(workspaceAtom);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z.string({ required_error: "Folder name is required" }),
      }),
    ),
    onSubmit: ({ name }) => {
      if (workspace?.id) mutate({ name, workspaceId: workspace?.id });
    },
  });

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center text-primary">
            <Folder className="mr-2" size={16} />
            Create Folder
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={formik.handleSubmit}>
              <Input
                className="mt-4"
                placeholder="Folder Name"
                id="name"
                {...formik.getFieldProps("name")}
              />
              <Button className="my-4" disabled={!formik.values.name}>
                Create
                {!isLoading && <Plus size={16} />}
                {isLoading && <Loader2 className="ml-2 h-6 w-6 animate-spin" />}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderDialog;
