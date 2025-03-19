import { useParams } from "react-router-dom";
import { FaYoutube, FaUsers } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { GiReturnArrow } from "react-icons/gi";
import { useGetPublishedCourseQuery } from "../redux/api/courseApi";
import CourseTile from "../components/CourseTile";

const CoursePage = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetPublishedCourseQuery(id);

    const courseTiles = [
        { icon: <FaYoutube />, description: "Get 16 lessons in 3 hours" },
        { icon: <GiReturnArrow />, description: "Daily guided exercise" },
        { icon: <FaUsers />, description: "Access to 50k+ community" },
        { icon: <AiFillLike />, description: "Regular expert feedback" },
    ];

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;

    return (
        <div className="flex flex-col my-4">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold">{data?.data?.title}</h2>
                <h4 className="text-lg">{data?.data?.description}</h4>
            </div>
            <div className="flex sm:flex-row flex-col justify-center space-x-4 my-6">
                <div className="space-y-4">
                    {courseTiles.map((tile, index) => (
                        <CourseTile
                            key={index}
                            icon={tile.icon}
                            description={tile.description}
                        />
                    ))}
                </div>
                <div>
                    <img
                        src={data?.data?.image}
                        alt="course image"
                        className="w-80 rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
