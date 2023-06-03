import Link from "next/link";

import { useWorkLogsQuery } from "../generated/graphql";
import NavBar from "../components/NavBar";

const Home = () => {
  const { data } = useWorkLogsQuery();

  return (
    <>
      <NavBar />
      {!data ? (
        <div>Loading....</div>
      ) : (
        <div className="bg-gray-100 min-h-screen md:p-10 p-2">
          <Link
            href="/create_workLog"
            className="bg-[#002D74] rounded-md text-white p-2 hover:scale-105 duration-300"
          >
            Add Work Log
          </Link>
          <div className="text-center text-2xl font=[Poppins] text-[#002D74]">
            Work Logs
          </div>
          <div className="overflow-auto rounded-lg shadow mt-5">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    No
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Title
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Description
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Start Time
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    End Time
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.workLogs.map((workLog, index) => (
                  <tr
                    key={workLog.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {++index}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {workLog.title}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {workLog.description}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {workLog.startTime}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {workLog.endTime}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Link
                        href={`/edit_workLog/${workLog.id}`}
                        className="bg-[#002D74] rounded-md text-white p-2 hover:scale-105 duration-300"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
