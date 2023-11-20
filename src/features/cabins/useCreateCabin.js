import { createEditCabine } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabine,
    onSuccess: () => {
      toast.success("New cabin sucessfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createCabin, isCreating };
}
