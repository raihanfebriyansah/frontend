import SpesialisasiForm from "@/components/spesialisasi/SpesialisasiForm";
import useSpesialisasiQueries from "@/hooks/admin/spesialisasi/useSpesialisasiQueries";
import { useParams } from "react-router-dom";

const CreateUpdatePage = () => {
  const { id } = useParams();
  const formMode = id ? "edit" : "create";
  const { spesialisasiByIdQuery } = useSpesialisasiQueries({ id: id });

  return (
    <SpesialisasiForm data={spesialisasiByIdQuery.data} formMode={formMode} />
  );
};

export default CreateUpdatePage;