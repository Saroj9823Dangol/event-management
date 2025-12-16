import { formatDate, formatTime } from "@/lib/utils";
import { IEvent } from "@/types";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

interface BookingEventInfoProps {
  event: IEvent;
  selectedLineupId: string | null;
}

const BookingEventInfo = ({
  event,
  selectedLineupId,
}: BookingEventInfoProps) => {
  return (
    <div className="p-6 border-b border-border">
      <div className="flex gap-4">
        <div className="relative w-20 h-20 shrink-0">
          <Image
            src={event.thumbnail.url || "/placeholder.svg"}
            alt={event.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-serif">{event.name}</h3>
          <p className="text-sm text-muted-foreground">{event.description}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {formatDate(
            event.lineups.find((l) => l.id === selectedLineupId)?.start_date ||
              ""
          )}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {formatTime(
            event.lineups.find((l) => l.id === selectedLineupId)?.start_date ||
              ""
          )}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {
            event.lineups.find((l) => l.id === selectedLineupId)?.addressable
              .address
          }
        </div>
      </div>
    </div>
  );
};

export default BookingEventInfo;
