import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";

export default function QuickStart() {
  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-2">Quick Start</p>
      <Card isPressable className="w-1/3 bg-darker">
        <CardHeader>
          <img src="/next.svg"></img>
        </CardHeader>
        <CardBody className="font-bold">A Modpack</CardBody>
        <CardFooter>
          <p>Forge 1.20.4</p>
        </CardFooter>
      </Card>
    </div>
  );
}
