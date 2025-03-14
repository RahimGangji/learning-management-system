const CourseCard = ({ course }) => {
    return (
        <div className="w-[350px] h-[400px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:scale-105 cursor-pointer flex flex-col">
            <div className="relative">
                <img
                    src={course?.image}
                    alt={course?.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-t-xl"></div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-2 text-gray-800">{course?.title}</h2>
                    <h2 className="text-xl font-semibold mb-2 text-gray-400">{course?.price}$</h2>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2 flex-1">{course?.description}</p>
                <button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                    Enroll Now
                </button>
            </div>
        </div>
    );
};

export default CourseCard;