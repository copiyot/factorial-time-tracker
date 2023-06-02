import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  //   Ctx,
} from "type-graphql";

import { WorkLog } from "../entity/WorkLog";

@InputType()
class CreateWorkLogInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;
}

@InputType()
class EditWorkLogInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  startTime?: Date;

  @Field({ nullable: true })
  endTime?: Date;
}

@Resolver()
export class WorkLogResolver {
  @Query(() => [WorkLog])
  async workLogs(): Promise<WorkLog[] | []> {
    const workLogs = await WorkLog.find({});
    return workLogs;
  }

  @Query(() => WorkLog)
  async workLog(@Arg("id") id: number): Promise<WorkLog | null> {
    return await WorkLog.findOne({ where: { id } });
  }

  @Mutation(() => WorkLog, { nullable: true })
  async createWorkLog(
    @Arg("options") options: CreateWorkLogInput
  ): Promise<WorkLog | null> {
    const { title, description, startTime, endTime } = options;

    const workLog = await WorkLog.create({
      title,
      description,
      startTime,
      endTime,
    }).save();

    return workLog;
  }

  @Mutation(() => WorkLog, { nullable: true })
  async editWorkLog(
    @Arg("options") options: EditWorkLogInput
  ): Promise<WorkLog | null> {
    const { id, title, description, startTime, endTime } = options;

    const workLogToEdit = await WorkLog.findOneBy({ id });

    if (!workLogToEdit) {
      return null;
    }

    if (title) {
      await WorkLog.update({ id }, { title });
    }

    if (description) {
      await WorkLog.update({ id }, { description });
    }

    if (startTime) {
      await WorkLog.update({ id }, { startTime });
    }

    if (endTime) {
      await WorkLog.update({ id }, { endTime });
    }

    return workLogToEdit;
  }

  @Mutation(() => WorkLog, { nullable: true })
  async deleteWorkLog(@Arg("id") id: number) {
    await WorkLog.delete(id);
  }
}
