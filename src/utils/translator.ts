// Translation dictionary and engine to support cross-nation collection interactions
// Supported languages: Portuguese (pt), English (en), Spanish (es), French (fr)

export type LanguageCode = 'pt' | 'en' | 'es' | 'fr';

export const LANGUAGE_LABELS: Record<LanguageCode, { label: string; flag: string }> = {
  pt: { label: 'Português', flag: '🇧🇷' },
  en: { label: 'English', flag: '🇺🇸' },
  es: { label: 'Español', flag: '🇪🇸' },
  fr: { label: 'Français', flag: '🇫🇷' },
};

// High-fidelity pre-translated pairs for existing static text to guarantee flawless visual quality
const TRANSLATION_DB: Record<string, Record<LanguageCode, string>> = {
  // Chat 1 Messages
  "Olá Maria! Tudo bem? Tenho muito interesse nessa figurinha do Messi. Você aceita diminuir para R$ 320,00?": {
    pt: "Olá Maria! Tudo bem? Tenho muito interesse nessa figurinha do Messi. Você aceita diminuir para R$ 320,00?",
    en: "Hi Maria! How are you? I'm highly interested in this Messi sticker. Would you accept reducing it to R$ 320.00?",
    es: "¡Hola María! ¿Qué tal? Tengo mucho interés en este cromo de Messi. ¿Aceptarías bajarlo a R$ 320,00?",
    fr: "Salut Maria! Comment ça va? Je suis très intéressée par cette image de Messi. Accepteriez-vous de baisser à R$ 320,00?",
  },
  "Olá João! Tudo bem também. Consigo fazer por R$ 330,00 se você puder buscar hoje mesmo no shopping da cidade!": {
    pt: "Olá João! Tudo bem também. Consigo fazer por R$ 330,00 se você puder buscar hoje mesmo no shopping da cidade!",
    en: "Hi João! I'm also doing fine. I can do R$ 330.00 if you can pick it up today at the city shopping mall!",
    es: "¡Hola João! Todo bien por aquí también. ¡Te lo puedo dejar en R$ 330,00 si vienes hoy mismo a buscarlo al centro comercial de la ciudad!",
    fr: "Salut João! Tout va bien aussi. Je peux faire R$ 330,00 si tu peux venir la chercher aujourd'hui même au centre commercial de la ville!",
  },
  "Fechado! Posso ir por volta das 18h no Shopping Esplanada. O que acha?": {
    pt: "Fechado! Posso ir por volta das 18h no Shopping Esplanada. O que acha?",
    en: "Deal! I can make it around 6 PM at Shopping Esplanada. What do you think?",
    es: "¡Hecho! Puedo ir sobre las 18:00 h al Shopping Esplanada. ¿Qué te parece?",
    fr: "C'est d'accord! Je peux y aller vers 18h au Shopping Esplanada. Qu'en penses-tu?",
  },
  "Ótimo, combinado! Fico no aguardo por lá. Vou levar a figurinha na capinha protetora.": {
    pt: "Ótimo, combinado! Fico no aguardo por lá. Vou levar a figurinha na capinha protetora.",
    en: "Great, agreed! I'll be waiting for you there. I'll bring the sticker inside a protective sleeve.",
    es: "¡Excelente, trato hecho! Te espero allí. Llevaré el cromo en una funda protectora.",
    fr: "Super, c'est convenu! Je t'attends là-bas. J'apporterai l'image dans une pochette de protection.",
  },

  // Chat 2 Messages
  "Olá João! Vi que você quer trocar o Neymar Jr. Você aceita trocar pelo Kane brilhante e mais duas figurinhas comuns?": {
    pt: "Olá João! Vi que você quer trocar o Neymar Jr. Você aceita trocar pelo Kane brilhante e mais duas figurinhas comuns?",
    en: "Hi João! I noticed you want to trade Neymar Jr. Would you accept exchanging it for a shiny Kane and two common stickers?",
    es: "¡Hola João! Vi que deseas cambiar a Neymar Jr. ¿Aceptarías cambiarlo por el Kane brillante y dos cromos comunes más?",
    fr: "Salut João! J'ai vu que tu voulais échanger Neymar Jr. Est-ce que tu accepterais de l'échanger contre un Kane brillant plus deux images communes?",
  },
  "Hum, eu já tenho o Kane comum, mas queria muito completar o time de Portugal. Você tem alguma repetida portuguesa?": {
    pt: "Hum, eu já tenho o Kane comum, mas queria muito completar o time de Portugal. Você tem alguma repetida portuguesa?",
    en: "Hmm, I already have the common Kane, but I really want to complete the Portugal team. Do you have any Portuguese duplicates?",
    es: "Mmm, ya tengo a Kane común, pero me gustaría mucho completar la selección de Portugal. ¿Tienes algún repetido portugués?",
    fr: "Hum, j'ai déjà le Kane commun, mais je voudrais vraiment compléter l'équipe du Portugal. As-tu des doubles du Portugal?",
  },

  // Simulation Quotes
  "Beleza! Vou verificar minha pilha de repetidas hoje à noite e retorno.": {
    pt: "Beleza! Vou verificar minha pilha de repetidas hoje à noite e retorno.",
    en: "Alright! I will check my pile of duplicates tonight and get back to you.",
    es: "¡Perfecto! Revisaré mi pila de repetidos esta noche y te aviso.",
    fr: "D'accord! Je vais vérifier ma pile de doubles ce soir et je reviens vers toi.",
  },
  "Excelente proposta! Combinado, me encontra amanhã na entrada principal do shopping pra gente efetuar físico.": {
    pt: "Excelente proposta! Combinado, me encontra amanhã na entrada principal do shopping pra gente efetuar físico.",
    en: "Excellent proposal! Agreed, meet me tomorrow at the main entrance of the mall to complete the physical swap.",
    es: "¡Excelente propuesta! Trato hecho, búscame mañana en la entrada principal del centro comercial para hacer el intercambio físico.",
    fr: "Excellente proposition! C'est d'accord, retrouve-moi demain à l'entrée principale du centre commercial pour faire l'échange physique.",
  },
  "Obrigado pelo contato! Você tem alguma outra brilhante do Brasil pra adicionar além dessa?": {
    pt: "Obrigado pelo contato! Você tem alguma outra brilhante do Brasil pra adicionar além dessa?",
    en: "Thanks for reaching out! Do you have any other shiny Brazil sticker to add besides this one?",
    es: "¡Gracias por contactarme! ¿Tienes algún otro cromo brillante de Brasil para agregar además de este?",
    fr: "Merci pour le contact! As-tu un autre sticker brillant du Brésil à ajouter en plus de celui-ci?",
  },
  "Fechado! Vou clicar para aprovar a troca aqui pela plataforma agora.": {
    pt: "Fechado! Vou clicar para aprovar a troca aqui pela plataforma agora.",
    en: "Deal! I'll click to approve the swap here through the platform right now.",
    es: "¡Hecho! Pulsaré para confirmar el intercambio en la plataforma ahora mismo.",
    fr: "Marché conclu! Je vais cliquer pour approuver l'échange ici sur la plateforme maintenant.",
  },
  "Opa, desculpe a demora! Essa figurinha está novinha, guardada na capinha.": {
    pt: "Opa, desculpe a demora! Essa figurinha está novinha, guardada na capinha.",
    en: "Oops, sorry for the delay! This sticker is brand new, stored inside a protective case.",
    es: "¡Vaya, perdona la demora! Este cromo está nuevecito, guardado en su funda.",
    fr: "Oups, désolé pour le retard! Cette image est toute neuve, bien gardée dans sa pochette.",
  },

  // Default welcome system propositions
  "Olá Maria, tenho interesse na sua figurinha! Aceita negociar?": {
    pt: "Olá Maria, tenho interesse na sua figurinha! Aceita negociar?",
    en: "Hello Maria, I'm interested in your sticker! Would you like to negotiate?",
    es: "¡Hola María, me interesa tu cromo! ¿Aceptas negociar?",
    fr: "Bonjour Maria, je suis intéressé par ton image! Acceptes-tu de négocier?",
  },
  "Olá Pedro Costa, tenho interesse na sua figurinha! Aceita negociar?": {
    pt: "Olá Pedro Costa, tenho interesse na sua figurinha! Aceita negociar?",
    en: "Hello Pedro Costa, I'm interested in your sticker! Would you like to negotiate?",
    es: "¡Hola Pedro Costa, me interesa tu cromo! ¿Aceptas negociar?",
    fr: "Bonjour Pedro Costa, je suis intéressé par ton image! Acceptes-tu de négocier?",
  },
  "Olá João Silva, tenho interesse na sua figurinha! Aceita negociar?": {
    pt: "Olá João Silva, tenho interesse na sua figurinha! Aceita negociar?",
    en: "Hello João Silva, I'm interested in your sticker! Would you like to negotiate?",
    es: "¡Hola João Silva, me interesa tu cromo! ¿Aceptas negociar?",
    fr: "Bonjour João Silva, je suis intéressé par ton image! Acceptes-tu de négocier?",
  },
  "Jude Bellingham Rookie card in pristine condition. Open to solid trade offers or PayPal.": {
    pt: "Card de Novato do Jude Bellingham em estado impecável. Aberto a propostas sólidas de troca ou PayPal.",
    en: "Jude Bellingham Rookie card in pristine condition. Open to solid trade offers or PayPal.",
    es: "Cromo de novato de Jude Bellingham en estado impecable. Abierto a ofertas sólidas de intercambio o PayPal.",
    fr: "Carte Rookie de Jude Bellingham dans un état impeccable. Ouvert aux offres d'échange sérieuses ou PayPal.",
  },
  "Cromo brillante de Pedri de España, excelente estado. Busco cromos de Brasil o Argentina para cambiar.": {
    pt: "Figurinha brilhante do Pedri da Espanha, excelente estado. Procuro figurinhas do Brasil ou Argentina para trocar.",
    en: "Shiny card of Spain's Pedri, excellent condition. Looking for Brazil or Argentina stickers to trade.",
    es: "Cromo brillante de Pedri de España, excelente estado. Busco cromos de Brasil o Argentina para cambiar.",
    fr: "Sticker brillant de Pedri d'Espagne, excellent état. Je cherche des stickers du Brésil ou de l'Argentine pour échanger.",
  },
  "Antoine Griezmann du Qatar 2022. Très bon état, stocké à l'abri du soleil. Envoi soigné et rapide.": {
    pt: "Antoine Griezmann do Qatar 2022. Muito bom estado, guardado longe do sol. Envio cuidadoso e rápido.",
    en: "Antoine Griezmann from Qatar 2022. Very good condition, stored away from sunlight. Fast and safe shipping.",
    es: "Antoine Griezmann de Qatar 2022. En muy buen estado, guardado lejos de la luz solar. Envío rápido y cuidadoso.",
    fr: "Antoine Griezmann du Qatar 2022. Très bon état, stocké à l'abri du soleil. Envoi soigné et rapide.",
  },
  "Figurinha Extra Legend Gold de Lionel Messi em estado impecável, recém-saída do pacotinho. Item de colecionador extremo.": {
    pt: "Figurinha Extra Legend Gold de Lionel Messi em estado impecável, recém-saída do pacotinho. Item de colecionador extremo.",
    en: "Extra Legend Gold Lionel Messi sticker in perfect condition, freshly pulled from the pack. Extreme collector's item.",
    es: "Cromo Extra Legend Gold de Lionel Messi en estado impecable, recién sacado del sobre. Artículo de coleccionista extremo.",
    fr: "Vignette Extra Legend Gold de Lionel Messi dans un état impeccable, fraîchement sortie du sachet. Objet de collectionneur extrême.",
  },
  "Figurinha Legend Bronze do CR7 em excelente estado. Aceito troca por Neymar Gold ou venda direta.": {
    pt: "Figurinha Legend Bronze do CR7 em excelente estado. Aceito troca por Neymar Gold ou venda direta.",
    en: "CR7 Legend Bronze sticker in excellent condition. Expecting trade for Neymar Gold or direct sale.",
    es: "Cromo Legend Bronze de CR7 en excelente estado. Acepto cambio por Neymar Gold o venta directa.",
    fr: "Vignette Legend Bronze de CR7 en excellent état. J'accepte un échange contre un Neymar Gold ou une vente directe.",
  },
  "Tenho repetida do craque brasileiro Neymar Jr. Procuro figurinhas do álbum da Copa de 2018 para trocar.": {
    pt: "Tenho repetida do craque brasileiro Neymar Jr. Procuro figurinhas do álbum da Copa de 2018 para trocar.",
    en: "I have a duplicate of the Brazilian star Neymar Jr. Looking for stickers from the 2018 World Cup album to trade.",
    es: "Tengo repetido de la estrella brasileña Neymar Jr. Busco cromos del álbum del Mundial de 2018 para cambiar.",
    fr: "J'ai un double de la star brésilienne Neymar Jr. Je recherche des images de l'album de la Coupe du Monde 2018 pour l'échanger.",
  },
  "Mbappé original brilhante em ótimo estado. Envio rápido via correio segurado ou entrego em mãos.": {
    pt: "Mbappé original brilhante em ótimo estado. Envio rápido via correio segurado ou entrego em mãos.",
    en: "Original shiny Mbappé in great condition. Fast shipping via insured mail or hand delivery.",
    es: "Mbappé original brillante en excelente estado. Envío rápido mediante correo asegurado o entrega en mano.",
    fr: "Mbappé brillant d'origine en excellent état. Expédition rapide par courrier assuré ou remise en main propre.",
  },
  "Vini Jr brilhante repetido. Quero trocar por qualquer lendária que eu não tenha no meu álbum.": {
    pt: "Vini Jr brilhante repetido. Quero trocar por qualquer lendária que eu não tenha no meu álbum.",
    en: "Shiny duplicate Vini Jr. I want to trade for any legendary sticker that I don't have in my album.",
    es: "Vini Jr brillante repetido. Quiero cambiarlo por cualquier cromo legendario que no tenga en mi álbum.",
    fr: "Double Vini Jr brillant. Je veux l'échanger contre n'importe quel sticker légendaire que je n'ai pas dans mon album.",
  },
  "Modrić comum em bom estado, apenas com marcas leves de manuseio no verso. Preço camarada.": {
    pt: "Modrić comum em bom estado, apenas com marcas leves de manuseio no verso. Preço camarada.",
    en: "Common Modrić in good shape, only with minor handling marks on the back. Friendly price.",
    es: "Modrić común en buen estado, solo con leves marcas de uso por detrás. Precio excelente.",
    fr: "Modrić commun en bon état, avec seulement de légères marques de manipulation sur le dos. Prix d'ami.",
  },
  "Harry Kane comum do time inglês. Troco por figurinha do escudo do Brasil ou vendo bem barato.": {
    pt: "Harry Kane comum do time inglês. Troco por figurinha do escudo do Brasil ou vendo bem barato.",
    en: "Common England striker Harry Kane. I'll swap it for a Brazil crest sticker or sell very cheap.",
    es: "Harry Kane común de la selección inglesa. Lo cambio por un cromo del escudo de Brasil o lo vendo muy barato.",
    fr: "Harry Kane commun de l'équipe d'Angleterre. Je l'échange contre un écusson du Brésil ou le vends très bon marché.",
  },
  "Kevin de Bruyne brilhante original. Perfeito estado físico, sem riscos.": {
    pt: "Kevin de Bruyne brilhante original. Perfeito estado físico, sem riscos.",
    en: "Original shiny Kevin de Bruyne. Perfect physical condition, no scratches.",
    es: "Kevin de Bruyne brillante original. Perfecto estado físico, sin rasguños.",
    fr: "Kevin de Bruyne brillant d'origine. Parfait état physique, sans rayures.",
  },
  "Artilheiro Lewa, excelente estado para completar seu álbum da Copa.": {
    pt: "Artilheiro Lewa, excelente estado para completar seu álbum da Copa.",
    en: "Striker Lewa, excellent condition to complete your World Cup album.",
    es: "Goleador Lewa, excelente estado para completar tu álbum del Mundial.",
    fr: "Le buteur Lewa, excellent état pour compléter ton album de la Coupe du Monde.",
  }
};

// Smart heuristic translation based on key phrase replacements for custom texts
const TRANSLATION_VOCABULARY: Record<string, Record<LanguageCode, string>> = {
  "olá": { pt: "olá", en: "hello", es: "hola", fr: "bonjour" },
  "oi": { pt: "oi", en: "hi", es: "hola", fr: "salut" },
  "tudo bem": { pt: "tudo bem", en: "how are you", es: "cómo estás", fr: "comment ça va" },
  "tenho interesse": { pt: "tenho interesse", en: "I am interested", es: "me interesa", fr: "je suis intéressé" },
  "figurinha": { pt: "figurinha", en: "sticker", es: "cromo", fr: "carte sticker" },
  "figurinhas": { pt: "figurinhas", en: "stickers", es: "cromos", fr: "images stickers" },
  "repetida": { pt: "repetida", en: "duplicate", es: "repetida", fr: "double" },
  "repetidas": { pt: "repetidas", en: "duplicates", es: "repetidas", fr: "doubles" },
  "troca": { pt: "troca", en: "trade/swap", es: "intercambio/cambio", fr: "échange" },
  "venda": { pt: "venda", en: "sale", es: "venta", fr: "vente" },
  "comprar": { pt: "comprar", en: "buy", es: "comprar", fr: "acheter" },
  "trocar": { pt: "trocar", en: "trade", es: "cambiar", fr: "échanger" },
  "aceita": { pt: "aceita", en: "do you accept", es: "aceptas", fr: "acceptes-tu" },
  "obrigado": { pt: "obrigado", en: "thank you", es: "gracias", fr: "merci" },
  "fechado": { pt: "fechado", en: "deal/agreed", es: "hecho/cerrado", fr: "convenu" },
  "excelente": { pt: "excelente", en: "excellent", es: "excelente", fr: "excellent" },
  "perfeito": { pt: "perfeito", en: "perfect", es: "perfecto", fr: "parfait" },
  "estado": { pt: "estado", en: "condition", es: "estado", fr: "état" },
  "novo": { pt: "novo", en: "new/mint", es: "nuevo", fr: "neuf" },
  "usado": { pt: "usado", en: "used", es: "usado", fr: "occasion" },
  "lendária": { pt: "lendária", en: "legendary", es: "legendaria", fr: "légendaire" },
  "rara": { pt: "rara", en: "rare", es: "rara", fr: "rare" },
  "comum": { pt: "comum", en: "common", es: "común", fr: "commune" },
  "time": { pt: "time", en: "team", es: "equipo", fr: "équipe" },
  "escudo": { pt: "escudo", en: "crest", es: "escudo", fr: "écusson" }
};

// Interactive translation engine function
export function translateText(
  text: string,
  targetLang: LanguageCode,
  sourceHint?: string
): { translatedText: string; isSimulated: boolean; detectedLang: LanguageCode } {
  const cleanText = text.trim();
  
  // 1. Check exact match in pre-compiled Database
  if (TRANSLATION_DB[cleanText] && TRANSLATION_DB[cleanText][targetLang]) {
    return {
      translatedText: TRANSLATION_DB[cleanText][targetLang],
      isSimulated: true,
      detectedLang: 'pt', // Default source for DB items is Portuguese
    };
  }

  // 2. Check variations (like names dynamically updated)
  for (const [key, langs] of Object.entries(TRANSLATION_DB)) {
    // If the lookup phrase is inside the text or resembles it
    if (cleanText.includes("interesse na sua figurinha") && key.includes("interesse na sua figurinha")) {
      const trans = langs[targetLang];
      // Try to maintain names
      let result = trans;
      const ownerNameMatch = cleanText.match(/Olá\s+([^,]+),/);
      if (ownerNameMatch && ownerNameMatch[1]) {
        const name = ownerNameMatch[1];
        result = result.replace(/Maria/g, name).replace(/João/g, name).replace(/Pedro Costa/g, name);
      }
      return {
        translatedText: result,
        isSimulated: true,
        detectedLang: 'pt',
      };
    }
    
    if (cleanText.includes("Vi o seu anúncio da figurinha") && key.includes("Vi o seu anúncio da figurinha")) {
      // Return a nice dynamic translated version!
      const playerMatch = cleanText.match(/figurinha\s+([A-Za-z\s\.\u00C0-\u00FF]+)\s+\(([^)]+)\)/);
      const sellerMatch = cleanText.match(/Olá\s+([^!]+)!/);
      
      const sellerName = sellerMatch ? sellerMatch[1] : "amigo";
      const playerName = playerMatch ? playerMatch[1] : "jogador";
      const playerNum = playerMatch ? playerMatch[2] : "00";

      const templateTranslations: Record<LanguageCode, string> = {
        pt: `Olá ${sellerName}! Vi o seu anúncio da figurinha ${playerName} (${playerNum}) no Marketplace e fiquei muito interessado em propor uma troca. Tenho algumas repetidas que podem lhe interessar!`,
        en: `Hello ${sellerName}! I saw your listing for the sticker ${playerName} (${playerNum}) in the Marketplace and I am very interested in proposing a trade. I have some duplicates that might interest you!`,
        es: `¡Hola ${sellerName}! Vi tu anuncio del cromo de ${playerName} (${playerNum}) en el Marketplace y estoy muy interesado en proponerte un intercambio. ¡Tengo algunos repetidos que podrían interesarte!`,
        fr: `Bonjour ${sellerName}! J'ai vu ton annonce pour le sticker ${playerName} (${playerNum}) sur le Marketplace et je suis très intéressé par proposer un échange. J'ai quelques doubles qui pourraient t'intéresser!`,
      };

      return {
        translatedText: templateTranslations[targetLang],
        isSimulated: true,
        detectedLang: 'pt',
      };
    }

    if (cleanText.includes("Match automático") && key.includes("Match automático")) {
      const playerMatch = cleanText.match(/pelo seu\s+([A-Za-z\s\.\u00C0-\u00FF]+)\s+\(([^)]+)\)/);
      const sellerMatch = cleanText.match(/Olá\s+([^!]+)!/);
      
      const sellerName = sellerMatch ? sellerMatch[1] : "amigo";
      const playerName = playerMatch ? playerMatch[1] : "jogador";
      const playerNum = playerMatch ? playerMatch[2] : "00";

      const matchTranslations: Record<LanguageCode, string> = {
        pt: `Olá ${sellerName}! Nosso álbum detectou um Match automático de figurinhas. Quero propor a troca do meu card repetido pelo seu ${playerName} (${playerNum})!`,
        en: `Hello ${sellerName}! Our album detected an automatic sticker Match. I want to propose swapping my duplicate card for your ${playerName} (${playerNum})!`,
        es: `¡Hola ${sellerName}! Nuestro álbum detectó un Match automático de cromos. ¡Quiero proponerte el intercambio de mi cromo repetido por tu ${playerName} (${playerNum})!`,
        fr: `Bonjour ${sellerName}! Notre album a détecté un Match automatique d'images. Je veux proposer l'échange de mon double contre ton ${playerName} (${playerNum})!`,
      };

      return {
        translatedText: matchTranslations[targetLang],
        isSimulated: true,
        detectedLang: 'pt',
      };
    }
  }

  // 3. Heuristic replacement translator for custom user typing
  let words = cleanText.split(/\b/);
  let translatedWords = words.map((word) => {
    const lCase = word.toLowerCase();
    if (TRANSLATION_VOCABULARY[lCase]) {
      const translatedWord = TRANSLATION_VOCABULARY[lCase][targetLang];
      // Match original case
      if (word.charAt(0) === word.charAt(0).toUpperCase() && word.length > 1) {
        return translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
      }
      return translatedWord;
    }
    return word;
  });

  let translatedHeuristic = translatedWords.join('');

  // If we translated absolutely nothing or couldn't recognize, do a clean simulated translation with a badge indicator
  if (translatedHeuristic === cleanText) {
    // Return with language code suffixes representing translation
    if (targetLang === 'en') {
      translatedHeuristic = `[Auto-Translated] ${cleanText} (English summary)`;
    } else if (targetLang === 'es') {
      translatedHeuristic = `[Traducido] ${cleanText} (Versión en Español)`;
    } else if (targetLang === 'fr') {
      translatedHeuristic = `[Traduit] ${cleanText} (Version Française)`;
    } else {
      translatedHeuristic = cleanText;
    }
  }

  return {
    translatedText: translatedHeuristic,
    isSimulated: true,
    detectedLang: targetLang === 'pt' ? 'en' : 'pt', // Detected source language guess
  };
}
