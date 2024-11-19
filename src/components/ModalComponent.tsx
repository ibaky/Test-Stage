"use client";

import { Modal, useModal } from "kitchn";
import { Container, Button, Image } from "kitchn"; // Assurez-vous d'importer 'Image'
import { useState } from "react";

const ModalComponent = () => {
  const [active, open, close] = useModal();
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);

  const handleImageClick = (imagePath: string) => {
    console.log("Image Path clicked:", imagePath); // Log pour vérifier le chemin cliqué
    setSelectedImagePath(imagePath);
    open();
  };

  return (
    <Container>
      {/* Boutons pour ouvrir les 6 images */}
      <Button size="normal" onClick={() => handleImageClick("/image/image1.jpeg")}>
        Open Image 1
      </Button>
      <Button size="normal" onClick={() => handleImageClick("/image/image2.jpeg")}>
        Open Image 2
      </Button>
      <Button size="normal" onClick={() => handleImageClick("/image/image3.jpeg")}>
        Open Image 3
      </Button>
      <Button size="normal" onClick={() => handleImageClick("/image/image4.jpeg")}>
        Open Image 4
      </Button>
      <Button size="normal" onClick={() => handleImageClick("/image/image5.jpeg")}>
        Open Image 5
      </Button>
      <Button size="normal" onClick={() => handleImageClick("/image/image6.jpeg")}>
        Open Image 6
      </Button>

      {/* Modal */}
      <Modal.Modal active={active} onClickOutside={close}>
        <Modal.Body>
          <Modal.Header>
            <Modal.Title>Image Preview</Modal.Title>
          </Modal.Header>
          {selectedImagePath ? (
            <Image
              src={selectedImagePath}
              alt="Selected Image"
              width={300}
              height={300}
              br={10}
              onError={(e) => {
                console.error("Failed to load image:", e.currentTarget.src);
                e.currentTarget.src = "/image/placeholder.png"; // Placeholder si l'image ne charge pas
              }}
            />
          ) : (
            <p>Loading image...</p>
          )}
        </Modal.Body>
        <Modal.Actions>
          <Modal.Action type="dark" onClick={close}>
            Close
          </Modal.Action>
        </Modal.Actions>
      </Modal.Modal>
    </Container>
  );
};

export default ModalComponent;
