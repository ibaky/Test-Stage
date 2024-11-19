"use client"; // La directive "use client" doit être en premier

import { KitchnProvider, Container, Modal } from "kitchn";
import { useModal } from "kitchn";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Image } from "kitchn";

const Page = () => {
  const [active, open, close] = useModal();
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(
    null
  );
  const [isMounted, setIsMounted] = useState(false); // Pour vérifier si le composant est monté côté client

  const router = useRouter();

  // Détecter quand le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const params = new URLSearchParams(window.location.search);
      const imageId = params.get("image");
      if (imageId) {
        const imagePath = `/image/image${imageId}.jpeg`;
        setSelectedImagePath(imagePath);
        open();
      }
    }
  }, [isMounted, open]);

  const handleImageClick = (imagePath: string, imageId: string) => {
    setSelectedImagePath(imagePath);
    open();
    router.push(`?image=${imageId}`);
  };

  const closeModal = () => {
    close();
    setSelectedImagePath(null);
    router.push("/");
  };

  const images = [
    [
      { id: "1", src: "/image/image1.jpeg", alt: "Image 1" },
      { id: "2", src: "/image/image2.jpeg", alt: "Image 2" },
      { id: "3", src: "/image/image3.jpeg", alt: "Image 3" },
    ],
    [
      { id: "4", src: "/image/image4.jpeg", alt: "Image 4" },
      { id: "5", src: "/image/image5.jpeg", alt: "Image 5" },
      { id: "6", src: "/image/image6.jpeg", alt: "Image 6" },
    ],
  ];

  return (
    <KitchnProvider>
      {isMounted && (
        <>
          {images.map((row, rowIndex) => (
            <Container
              key={rowIndex}
              row
              gap={20}
              align="center"
              justify="center"
              mt={10}
            >
              {row.map((image) => (
                <Container
                  key={image.id}
                  onClick={() => handleImageClick(image.src, image.id)}
                  style={{ cursor: "pointer" }}
                  br={50}
                  bw="2px"
                  bs="solid"
                  bc="gray"
                >
                  <Image
                    br={50}
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={300}
                  />
                </Container>
              ))}
            </Container>
          ))}

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
        </>
      )}
    </KitchnProvider>
  );
};

export default Page;
