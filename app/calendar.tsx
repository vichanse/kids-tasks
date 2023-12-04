"use client";

import { useState, useEffect } from "react";
import { Callout, Card, Col, Grid, Metric, Text, Title } from "@tremor/react";
import Image from "next/image";

type TaskItem = {
  id: number;
  task: string;
  color: string;
  icon: string;
};
const tasks = [
  [1, 0, 2],
  [2, 1, 0],
  [0, 2, 1],
];

const taskItems: TaskItem[] = [
  { id: 0, task: "Vide la machine", color: "red", icon: "IMG_0328.svg" },
  { id: 1, task: "Met la table", color: "green", icon: "IMG_0329.svg" },
  { id: 2, task: "Débarrasse la table", color: "blue", icon: "IMG_0330.svg" },
];

const getTaskById = (id: number): TaskItem | undefined => {
  return taskItems.find((item) => item.id === id);
};
function Calendar() {
  const [date, setDate] = useState(new Date()); // date actuelle

  useEffect(() => {
    // Calculez le nombre de millisecondes jusqu'à minuit
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Définissez un délai initial jusqu'à minuit, puis un intervalle de 24 heures
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setDate(
          (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
        );
      }, 86400000); // avance d'un jour toutes les 24 heures (86400000 ms)

      return () => clearInterval(intervalId); // nettoyez l'intervalle lors du démontage du composant
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId); // nettoyez le délai lors du démontage du composant
  }, []);

  const startDate = new Date(2023, 10, 1); // 1er Novembre 2023
  const timeDiff = date.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  const taskIndex = daysDiff % 3;

  return (
    <div>
      <Grid numItems={1} numItemsSm={1} numItemsLg={3} className="gap-3">
        <Col numColSpan={1} numColSpanLg={3}>
          <Card>
            <Text>Date</Text>
            <Metric>{date.toLocaleDateString()}</Metric>
          </Card>
        </Col>
        <Card
          className="max-w-xs mx-auto"
          decoration="top"
          decorationColor="green"
        >
          <Metric>Keyrwynn</Metric>
          <Text>{getTaskById(tasks[taskIndex][0])?.task}</Text>
          <Image
            src={`/${getTaskById(tasks[taskIndex][0])?.id}-keyrwynn.svg`}
            alt=""
            width={100}
            height={100}
          />
        </Card>

        <Card
          className="max-w-xs mx-auto"
          decoration="top"
          decorationColor="blue"
        >
          <Metric>Keyshawn</Metric>
          <Text>{getTaskById(tasks[taskIndex][1])?.task}</Text>
          <Image
            src={`/${getTaskById(tasks[taskIndex][1])?.id}-keyshawn.svg`}
            alt=""
            width={100}
            height={100}
          />
        </Card>

        <Card
          className="max-w-xs mx-auto"
          decoration="top"
          decorationColor="rose"
        >
          <Metric>Keylia</Metric>
          <Text>{getTaskById(tasks[taskIndex][2])?.task}</Text>
          <Image
            src={`/${getTaskById(tasks[taskIndex][2])?.id}-keylia.svg`}
            alt=""
            width={100}
            height={100}
          />
        </Card>
      </Grid>
    </div>
  );
}

export default Calendar;
