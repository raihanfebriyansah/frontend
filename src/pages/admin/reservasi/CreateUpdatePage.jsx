import ReservasiForm from "@/components/reservasi/ReservasiForm";
import useReservasiQueries from "@/hooks/admin/reservasi/useReservasiQueries";
import { useParams } from "react-router-dom";

const CreateUpdatePage = () => {
  const { id } = useParams();
  const formMode = id ? "edit" : "create";
  const { reservasiByIdQuery } = useReservasiQueries({ id: id });

  return (
    <ReservasiForm data={reservasiByIdQuery.data} formMode={formMode} />
  );
};

export default CreateUpdatePage;