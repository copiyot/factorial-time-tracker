import { gCall } from "../test-utils/gCall";
import { testConn } from "../test-utils/testConn";
import { DataSource } from "typeorm";

let conn: DataSource;

beforeAll(async () => {
  conn = await testConn().initialize();
});

afterAll(async () => {
  await conn.destroy();
});

const createWorkLogMutation = `
mutation CreateWorkLog(
  $data: CreateWorkLogInput!
) {
  createWorkLog(
    options: $data
  ) {
    title
    description
    startTime
    endTime
  }
}
`;

const editWorkLogMutation = `
mutation EditWorkLog(
  $data: EditWorkLogInput!
) {
  editWorkLog(
    options: $data
  ) {
    id
    title
    description
    startTime
    endTime
  }
}
`;

const fetchWorkLogQuery = `
query WorkLog(
  $data: Float!
) {
  workLog(
    id: $data
  ) {
    id
    title
    description
    startTime
    endTime
  }
}
`;

const fetchWorkLogsQuery = `
query WorkLogs {
  workLogs {
    id
    title
    description
    startTime
    endTime
  }
}
`;

it("Creates a worklog", async () => {
  const createdWorkLog = await gCall({
    source: createWorkLogMutation,
    variableValues: {
      data: {
        title: "jimmy",
        description: "Boston celtics",
        startTime: "2023-06-02T10:44:25.000Z",
        endTime: "2023-06-03T10:44:25.000Z",
      },
    },
  });

  expect(createdWorkLog.data).toEqual({
    createWorkLog: {
      title: "jimmy",
      description: "Boston celtics",
      startTime: "2023-06-02T10:44:25.000Z",
      endTime: "2023-06-03T10:44:25.000Z",
    },
  });
});

it("Edits a worklog", async () => {
  const editedWorkLog = await gCall({
    source: editWorkLogMutation,
    variableValues: {
      data: {
        id: 1,
        title: "Sejo",
      },
    },
  });

  expect(editedWorkLog.data?.editWorkLog).toEqual({
    id: 1,
    title: "Sejo",
    description: "Boston celtics",
    startTime: "2023-06-02T10:44:25.000Z",
    endTime: "2023-06-03T10:44:25.000Z",
  });
});

it("Fetches a worklog", async () => {
  const workLog = await gCall({
    source: fetchWorkLogQuery,
    variableValues: {
      data: 1,
    },
  });

  expect(workLog.data?.workLog).toEqual({
    id: 1,
    title: "Sejo",
    description: "Boston celtics",
    startTime: "2023-06-02T10:44:25.000Z",
    endTime: "2023-06-03T10:44:25.000Z",
  });
});

it("Fetches worklogs", async () => {
  const workLogs = await gCall({
    source: fetchWorkLogsQuery,
  });

  expect((workLogs.data?.workLogs as ObjectConstructor).length).toBeGreaterThan(
    0
  );
});
