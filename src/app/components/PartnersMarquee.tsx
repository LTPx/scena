"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PartnerWp } from "../_interfaces/wordpress-components";

interface Props {
  partners: PartnerWp[];
}

const CARD_WIDTH = 220;
const CARD_HEIGHT = 90;
const GAP_PX = 16;
// px por segundo -> controla la velocidad del loop, constante sin
// importar cuántos partners haya.
const SPEED_PX_PER_SEC = 60;

export default function PartnersMarquee({ partners }: Props) {
  if (!partners?.length) return null;

  // Duplicamos la lista para que el loop sea perfectamente continuo:
  // cuando el primer set termina de salir por la izquierda, el segundo
  // set ya está exactamente en la posición inicial.
  const track = [...partners, ...partners];
  const singleSetWidth = partners.length * (CARD_WIDTH + GAP_PX);
  const duration = singleSetWidth / SPEED_PX_PER_SEC;

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        style={{ gap: `${GAP_PX}px` }}
        className="flex"
        animate={{ x: [0, -singleSetWidth] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {track.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
            className="flex flex-shrink-0 items-center justify-center rounded-[8px] border border-[#A89572]/40"
          >
            <Image
              src={partner.logo.url}
              alt={partner.logo.alt || partner.name}
              width={140}
              height={50}
              className="h-auto max-h-[50px] w-auto max-w-[140px] object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}