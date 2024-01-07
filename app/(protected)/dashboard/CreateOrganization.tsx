import { createOrganization } from "@/actions/organisations/create";
import SubmitOrganization from "../../../components/SubmitButton";
import { useRouter } from "next/navigation";
import { ToastContainer, ToastOptions, toast } from "react-toastify";

export const toastOption: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const CreateOrganization = () => {
  const router = useRouter();

  const createOrg = async (formData: FormData) => {
    const response = await createOrganization(formData);
    if (response?.success) {
      const { message, data } = response;
      if (data?.id) {
        const { id }: { id: string } = data;
        toast.success(message, toastOption);
        router.push(`/organizations/${id}`);
      }
    } else {
      if (typeof response.message === "string") {
        toast.error(response.message, toastOption);
      } else {
        const messages: string[] = response.message;
        messages.forEach((element) => {
          toast.error(element, toastOption);
        });
      }
    }
  };

  return (
    <div className="h-full w-full px-2 py-4">
      <h1 className="text-lg md:text-2xl text-center border-b pb-3">
        Create New Organization
      </h1>
      <form
        action={createOrg}
        className="mt-5 flex flex-col items-center justify-center gap-y-3"
      >
        <input
          name="name"
          type="text"
          required
          placeholder="Name"
          className="py-2  px-3 rounded-[10px] w-full border-2 rouded-sm"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="py-2 px-3 rounded-[10px] w-full border-2 rouded-sm"
        />
        <ToastContainer />
        <SubmitOrganization text={'Create an Organization'} />
      </form>
    </div>
  );
};

export default CreateOrganization;
