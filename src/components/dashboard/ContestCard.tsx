"use client";

import { useState } from "react";

import {
  Bookmark,
  Calendar,
  ClockAlert,
  LoaderCircle,
  MoveRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Contest } from "@/types/contest";

import "./styles.css";

function relevantTag() {
  return (
    <div
      className="
      max-w-max px-2 py-1 
      rounded-xl border border-green-300 bg-green-200 
      text-[15px] tracking-tight font-[family-name:var(--font-geist-sans)] text-green-700 font-medium"
    >
      <p>Muito Relevante</p>
    </div>
  );
}

function ptDate(
  date: Date,
  name: string,
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
) {
  return (
    <div className="flex flex-col items-center space-y-0.5">
      <small className="text-slate-600">{name}</small>
      <div className="flex items-center space-x-1.5">
        <Icon className="w-4 h-4" />
        <time className="text-[15px]">
          {(() => {
            const dateStr = new Date(date).toLocaleString("pt-PT", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            const [day, month, year] = dateStr.replace(/de /g, "").split(" ");
            return `${day} ${month.charAt(0).toUpperCase()}${month.slice(
              1
            )} ${year}`;
          })()}
        </time>
      </div>
    </div>
  );
}

function aiButtonText(state: AIState) {
  switch (state) {
    case AIState.None:
      return (
        <>
          <Sparkles fill="white" />
          <span>Analisar com AI</span>
        </>
      );
    case AIState.Loading:
      return (
        <>
          <LoaderCircle className="animate-spin" strokeWidth={3} />
          <span>Analisar com AI</span>
        </>
      );
    case AIState.Open:
      return <span>Fechar</span>;
    case AIState.Closed:
      return <span>Abrir</span>;

    default:
      break;
  }
}

function generateAIText(aiState: AIState) {
  return (
    <div
      className="space-y-2 overflow-scroll"
      style={{
        marginTop: aiState == AIState.Open ? "12px" : "0px",
        height: aiState == AIState.Open ? "256px" : "0px",
        transitionDuration: "500ms",
      }}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat
        porttitor molestie. Mauris ac porttitor elit, vitae iaculis erat. In
        enim tellus, luctus sit amet odio in, vulputate eleifend magna.
        Phasellus cursus vehicula luctus. Mauris pretium enim leo, ut
        condimentum dui aliquam at.
      </p>
      <p>
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Suspendisse non lacus eu ex pellentesque scelerisque a
        mollis urna. Donec tempus nunc dui, ac posuere velit pulvinar vitae.
      </p>
      <p>
        Proin pharetra quis libero et aliquet. Aliquam ultricies vitae tortor
        eget porttitor. Etiam fermentum auctor velit. Nam at dolor in sapien
        aliquet viverra at eu ex. Vestibulum bibendum magna id mattis
        ullamcorper.Morbi sodales sagittis ex. Nullam vitae sagittis tortor, id
        maximus nisl.
      </p>
      <p>
        Nam eu lorem sed dolor fringilla tristique eu nec tortor. Suspendisse
        quis lorem eu mauris tristique rhoncus nec in elit. Sed sed tempus
        metus. Morbi malesuada scelerisque scelerisque.
      </p>
      <p>
        Ut arcu felis, pulvinar non augue a, iaculis venenatis ex. Suspendisse
        mauris lacus, scelerisque quis commodo hendrerit, tristique a magna. Sed
        quis blandit quam, at commodo lacus. Phasellus rutrum neque vel magna
        varius luctus.
      </p>
    </div>
  );
}

enum AIState {
  None,
  Loading,
  Open,
  Closed,
}

interface ContestItemProps {
  contest: Contest;
}

export default function ContextCard({ contest }: ContestItemProps) {
  const { toast } = useToast();

  const [aiState, setAiState] = useState<AIState>(AIState.None);

  const doAIStuff = () => {
    switch (aiState) {
      case AIState.None:
        setAiState(AIState.Loading);

        setTimeout(() => {
          setAiState(AIState.Open);
        }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000);
        break;
      case AIState.Open:
        setAiState(AIState.Closed);
        break;
      case AIState.Closed:
        setAiState(AIState.Open);
        break;
    }
  };

  return (
    <div
      className="
        card-base
        flex flex-col space-y-3
        overflow-clip
        transition-all duration-250
        lg:hover:shadow-md lg:transition-all duration-250" // lg:hover:-translate-y-1 lg:hover:-translate-x-1 lg:transition-[transform,box-shadow] lg:duration-250
    >
      <div className="grid grid-cols-12 gap-8 h-36">
        <div className="col-span-7 space-y-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold">{contest.name}</h3>
            <h6 className="">{contest.institution}</h6>
          </div>
          {contest.type === "Transportes" && relevantTag()}
        </div>
        <div className="col-span-5 flex flex-col justify-between">
          <div className="grid justify-items-center">
            <small className="text-slate-600">Preço Base</small>
            <p className="text-xl font-semibold">{contest.price}</p>
          </div>
          <div className="flex justify-between items-center">
            {ptDate(contest.publish_date, "Data de Publicação", Calendar)}
            <MoveRight />
            {ptDate(contest.submission_date, "Prazo de Submissão", ClockAlert)}
          </div>
        </div>
      </div>
      <div className="">
        <hr></hr>
        <div className="flex justify-between items-center pt-3">
          <div className="space-x-4">
            <Button
              disabled={aiState == AIState.Loading}
              className="
              min-w-[156px] gap-1 align-middle
              text-card
              shadow-none
              bg-[#4285F4]
              hover:bg-[#4285F4]"
              onClick={() => {
                doAIStuff();
              }}
            >
              {aiButtonText(aiState)}
            </Button>
            <Button
              className="
              gap-1 align-middle
              text-card text-[#4285F4]
              shadow-none
              border border-[#4285F4]
              bg-[#f2f2f2]
              hover:bg-[#f2f2f2]"
              onClick={() => {
                toast({
                  description: contest.name,
                  title: "Adicionado à lista de favoritos.",
                  className: "mt-4",
                  duration: 4000,
                  action: (
                    <ToastAction altText="Cancelar">Cancelar</ToastAction>
                  ),
                });
              }}
            >
              <Bookmark />
              <span>Guardaaaar</span>
            </Button>
          </div>
          <p>{contest.location}</p>
        </div>
        {generateAIText(aiState)}
      </div>
    </div>
  );
}
