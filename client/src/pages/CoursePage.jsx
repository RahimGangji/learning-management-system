import { useParams } from "react-router-dom"
import { useGetPublishedCourseQuery } from "../redux/api/courseApi";

function CoursePage() {
    const {id} = useParams();
    const {data, isLoading, isError} = useGetPublishedCourseQuery(id);

  return (
    <div className="min-h-screen flex justify-center items-center text-black">{id}</div>
  )
}

export default CoursePage;