import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../components/NavBar";
import {
  useCreateWorkLogMutation,
  WorkLogsDocument,
} from "../generated/graphql";

const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    startTime: yup.date().required("Start time is required"),
    endTime: yup.date().required("End time is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CreateWorkLog = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [createWorkLog] = useCreateWorkLogMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { title, description, startTime, endTime } = data;

    const response = await createWorkLog({
      variables: {
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

    if (response.data?.createWorkLog?.id) {
      router.push("/");
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 min-h-screen md:p-10 p-2">
        <div className="bg-gray-100 rounded-2xl shadow-lg max-w-3x1 p-5 items-center">
          <h2 className="font-bold text-2x1 text-[#002D74]">
            Add a work log to track your time
          </h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              {...register("title")}
              placeholder="Work Log title"
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.title?.message}
            </div>
            <input
              className="p-2 rounded-xl border"
              type="text"
              placeholder="Work Log Description"
              {...register("description")}
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.description?.message}
            </div>
            <Controller
              control={control}
              name="startTime"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placeholderText="Select start time"
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={onChange}
                  selected={value}
                />
              )}
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.startTime?.message}
            </div>
            <Controller
              control={control}
              name="endTime"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placeholderText="Select end time"
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={onChange}
                  selected={value}
                />
              )}
            />
            <div className="text-[13px] text-[#bf1650]">
              {errors.endTime?.message}
            </div>
            <button className="bg-[#002D74] w-72 rounded-xl text-white py-2 hover:scale-105 duration-300 sm:self-center">
              Add Work Log
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateWorkLog;
