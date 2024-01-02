import { createOrganization } from "@/actions/organisations/create";
import SubmitOrganization from "./SubmitOrganization";
import { useRouter } from "next/navigation";

const CreateOrganization = () => {
  const router = useRouter();
  
  const createOrg = async(formData : FormData) => {
    // try {
    //   const response = await createOrganization(formData);
    //   if (response.error) {
  
    //   }
    //   else {
    //     const {message, id } = response;
    //     router.push(`/organizations/${id}`)
    //   }
    // } catch (error) {
    //   console.log('something goes wrong')
    // }
  }

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
        <SubmitOrganization />
      </form>
    </div>
  );
};

export default CreateOrganization;
