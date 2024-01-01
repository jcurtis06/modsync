"use client";

import { useUser } from "@/hooks/useUser";
import { supabase } from "@/supabaseClient";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

export default function CreatePack() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");
  const [loaderVersion, setLoaderVersion] = useState("");
  const user = useUser(false);

  const createPack = async () => {
    if (!user) {
      console.error("User is not logged in!");
      return;
    }

    const { data: modpackData, error: modpackError } = await supabase
      .from("modpacks")
      .insert([{ name, loader: loaderVersion, user_id: user.id }])
      .select("*");

    if (modpackError || !modpackData) {
      console.error(modpackError);
      return;
    }

    console.log("Modpack created with data: ", modpackData);
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create Modpack
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create Modpack</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Modpack Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Modpack Loader Version"
                  onChange={(e) => setLoaderVersion(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={createPack}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
