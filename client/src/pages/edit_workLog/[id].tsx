import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../../components/NavBar";
import {
  useWorkLogQuery,
  useEditWorkLogMutation,
  WorkLogsDocument,
} from "../../generated/graphql";

interface WorkLog {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
}

const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    startTime: yup.date().required("Start time is required"),
    endTime: yup.date().required("End time is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const EditWorkLog = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useWorkLogQuery({
    variables: {
      Id: parseInt(id as string),
    },
  });
  const [updateWorkLog] = useEditWorkLogMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { title, description, startTime, endTime } = data;

    const response = await updateWorkLog({
      variables: {
        Id: parseInt(id as string),
        title,
        description,
        startTime,
        endTime,
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: WorkLogsDocument,
        },
      ],
    });

    if (response.errors) {
      alert("Ooops something went wrong");
    }

    if (response.data?.editWorkLog?.id) {
      router.push("/");
    }
  };

  if (!data) {
    return <>Loading....</>;
  }

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen md:p-10 p-2">
        <div className="bg-gray-100 rounded-2xl shadow-lg max-w-3x1 p-5 items-center">
          <h2 className="font-bold text-2x1 text-[#002D74]">Edit your book</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className="font-bold text-2x1 text-[#002D74]">Title:</span>
            <span>
              <input
                className="p-2 rounded-xl border w-full"
                type="text"
                placeholder="Work Log title"
                defaultValue={data.workLog.title}
                {...register("title")}
              />
              <div className="text-[13px] text-[#bf1650]">
                {errors.title?.message}
              </div>
            </span>
            <span className="font-bold text-2x1 text-[#002D74]">
              Description:
            </span>
            <span>
              <input
                className="p-2 rounded-xl border w-full"
                type="text"
                placeholder="Work Log Description"
                defaultValue={data.workLog.description}
                {...register("description")}
              />
              <div className="text-[13px] text-[#bf1650]">
                {errors.description?.message}
              </div>
            </span>

            <span className="font-bold text-2x1 text-[#002D74]">
              Start time:
            </span>
            <Controller
              control={control}
              name="startTime"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placeholderText="Select start time"
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={onChange}
                  selected={value ? value : new Date(data.workLog.startTime)}
                />
              )}
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.startTime?.message}
            </div>

            <span className="font-bold text-2x1 text-[#002D74]">End time:</span>
            <Controller
              control={control}
              name="endTime"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placeholderText="Select start time"
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={onChange}
                  selected={value ? value : new Date(data.workLog.endTime)}
                />
              )}
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.endTime?.message}
            </div>

            <button className="bg-[#002D74] w-72 rounded-xl text-white py-2 hover:scale-105 duration-300 sm:self-center">
              Edit Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditWorkLog;
