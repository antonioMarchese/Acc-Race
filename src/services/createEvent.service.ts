import { Track } from "@prisma/client";

interface IEventService {
  getEvent(date: Date, trackName: string): Promise<string | null>;
}

class EventService implements IEventService {
  async getEvent(date: Date, trackName: string): Promise<string | null> {
    const trackResponse = await fetch(`/api/tracks/${trackName}`, {
      method: "GET",
    });

    if (trackResponse.status === 200) {
      const track = (await trackResponse.json()) as Track;
    }

    return null;
  }
}
