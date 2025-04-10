import DoctorForm from "@/components/doctor/DoctorForm";
import useDoctorQueries from "@/hooks/admin/doctor/useDoctorQueries";
import { useParams } from "react-router-dom";

const CreateUpdatePage = () => {
  const { id } = useParams();
  const formMode = id ? "edit" : "create";
  const { doctorByIdQuery } = useDoctorQueries({ id: id });

  return (
    <DoctorForm data={doctorByIdQuery.data} formMode={formMode} />
  );
};

export default CreateUpdatePage;