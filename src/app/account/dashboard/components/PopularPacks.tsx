import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

export default function PopularPacks() {
  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-2">What's Poppin'</p>
      <Card isPressable className="w-1/3 bg-darker">
        <CardHeader>
          <img src="/next.svg"></img>
        </CardHeader>
        <CardBody className="">
          <p className="font-bold">A Modpack</p>
          <p className="lowercase">By jcurtis06</p>
        </CardBody>
        <CardFooter>
          <p>Forge 1.20.4</p>
        </CardFooter>
      </Card>
    </div>
  );
}
