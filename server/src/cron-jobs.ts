import schedule from "node-schedule";
import prisma from "./prisma-client.js";
import { subDays } from "date-fns";
export const cleanOutdatedResetTokens = schedule.scheduleJob(
  { hour: 1 },
  async () => {
    const fifteenDayAgo = subDays(new Date(), 15);
    try {
      const { count } = await prisma.file.deleteMany({
        where: {
          trashedAt: {
            lte: fifteenDayAgo,
          },
        },
      });
      console.log(`${count} ${count > 1 ? "files" : "file"} deleted`);
    } catch (error) {
      console.error("Auto deleting files cron job error");
    }
  }
);
