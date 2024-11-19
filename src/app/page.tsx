"use client"; // La directive "use client" doit être en premier

import { KitchnProvider, Container, Modal } from "kitchn";
import { useModal } from "kitchn";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Image } from "kitchn";

const Page = () => {
  const [active, open, close] = useModal();
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const imageId = searchParams.get("image");
    if (imageId) {
      const imagePath = `/image/image${imageId}.jpeg`; // Toutes les images sont en .jpeg
      setSelectedImagePath(imagePath);
      open();
    }
  }, [searchParams]);

  const handleImageClick = (imagePath: string, imageId: string) => {
    setSelectedImagePath(imagePath);
    open();
    router.push(`?image=${imageId}`);
  };

  const closeModal = () => {
    close();
    setSelectedImagePath(null);
    router.push("/"); // Retourne à l'URL sans paramètre
  };

  return (
    <KitchnProvider>
      {/* Première ligne de 3 images */}
      <Container row gap={20} align="center" justify="center" br={50}>
        <Container
          onClick={() => handleImageClick("/image/image1.jpeg", "1")}
          style={{ cursor: "pointer" }}
          br={50}
          bw="2px"
          bs="solid"
          bc="gray"
        >
          <Image
            br={50}
            src="/image/image1.jpeg"
            alt="Image 1"
            width={300}
            height={300}
          />
        </Container>
        <Container
          onClick={() => handleImageClick("/image/image2.jpeg", "2")}
          style={{ cursor: "pointer" }}
          br={50}
          bw="2px"
          bs="solid"
          bc="black"
        >
          <Image
            br={50}
            src="/image/image2.jpeg"
            alt="Image 2"
            width={300}
            height={300}
          />
        </Container>
        <Container
          onClick={() => handleImageClick("/image/image3.jpeg", "3")}
          style={{ cursor: "pointer" }}
          br={50}
          bw="2px"
          bs="solid"
          bc="gray"
        >
          <Image
            br={50}
            src="/image/image3.jpeg"
            alt="Image 3"
            width={300}
            height={300}
          />
        </Container>
      </Container>

      {/* Deuxième ligne de 3 images */}
      <Container row gap={20} align="center" justify="center">
        <Container
          onClick={() => handleImageClick("/image/image4.jpeg", "4")}
          style={{ cursor: "pointer" }}
          br={50}
          bw="2px"
          bs="solid"
          bc="black"
          mt={10}
        >
          <Image
            br={50}
            src="/image/image4.jpeg"
            alt="Image 4"
            width={300}
            height={300}
          />
        </Container>
        <Container
          onClick={() => handleImageClick("/image/image5.jpeg", "5")}
          style={{ cursor: "pointer" }}
          br={50}
          bw="2px"
          bs="solid"
          bc="black"
          mt={10}
        >
          <Image
            br={50}
            src="/image/image5.jpeg"
            alt="Image 5"
            width={300}
            height={300}
          />
        </Container>
        <Container
          onClick={() => handleImageClick("/image/image6.jpeg", "6")}
          style={{ cursor: "pointer" }}
          br={50}
          bw="2px"
          bs="solid"
          bc="black"
          mt={10}
        >
          <Image
            br={50}
            src="/image/image6.jpeg"
            alt="Image 6"
            width={300}
            height={300}
          />
        </Container>
      </Container>

      {/* Modal */}
      <Modal.Modal active={active} onClickOutside={closeModal}>
        <Modal.Body>
          <Modal.Header>
            <Modal.Title>Selected Image</Modal.Title>
          </Modal.Header>
          {selectedImagePath && (
            <Image
              src={selectedImagePath}
              alt="Selected Image"
              width={300}
              height={300}
            />
          )}
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action type="dark" onClick={closeModal}>
            Close
          </Modal.Action>
        </Modal.Actions>
      </Modal.Modal>
    </KitchnProvider>
  );
};

export default Page;
