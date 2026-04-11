const bookConfigScript = document.currentScript;

document.addEventListener("DOMContentLoaded", async () => {
    let config;
    let configUrl;

    try {
        const configPath = bookConfigScript?.dataset.configPath || "./config.json";
        configUrl = new URL(configPath, window.location.href);
        const response = await fetch(configUrl);
        config = await response.json();
    } catch (error) {
        console.error("Erro ao carregar config.json:", error);
        return;
    }

    applyHomeConfig(config);
    applyPageConfig(config);
    applyHeaderConfig(config);
    applyHelpSectionConfig(config);
    applyFooterConfig(config);
    applyFinalPageConfig(config, configUrl);
});

function applyHomeConfig(config) {
    if (config.home?.browserTitle) {
        document.title = config.home.browserTitle;
    }

    const subtitleEl = document.querySelector(".texto-topo");
    const startButtonEl = document.querySelector(".btn-iniciar");
    const isHomePage = Boolean(subtitleEl || startButtonEl || document.querySelector(".area-personagem"));

    if (subtitleEl && config.home?.subtitle) {
        subtitleEl.textContent = config.home.subtitle;
    }

    if (isHomePage) {
        const titleImageEl = document.querySelector(".titulo");
        const characterImageEl = document.querySelector(".menino");

        if (titleImageEl && config.home?.titleImage) {
            titleImageEl.setAttribute("src", config.home.titleImage);
        }

        if (characterImageEl && config.home?.characterImage) {
            characterImageEl.setAttribute("src", config.home.characterImage);
        }
    }

    if (startButtonEl) {
        if (config.home?.startButtonText) {
            startButtonEl.textContent = config.home.startButtonText;
        }

        if (config.home?.startButtonLink) {
            startButtonEl.setAttribute("href", config.home.startButtonLink);
        }
    }
}

function applyPageConfig(config) {
    const currentPageSlug = document.body.getAttribute("data-page");
    if (!currentPageSlug || !Array.isArray(config.pages)) {
        return;
    }

    const pageConfig = config.pages.find((page) => page.slug === currentPageSlug);
    if (!pageConfig) {
        return;
    }

    if (pageConfig.title && config.book?.title) {
        document.title = `${pageConfig.title} - ${config.book.title}`;
    }

    const pageIndicatorEl = document.querySelector(".pagina-indicador");
    if (pageIndicatorEl && pageConfig.number) {
        pageIndicatorEl.textContent = formatPageIndicator(pageConfig.number);
    }
}

function applyHeaderConfig(config) {
    const header = document.querySelector(".topo-site");
    if (!header || !config.header) {
        return;
    }

    const logoLink = header.querySelector("a");
    if (logoLink && config.header.links?.instagramUrl) {
        logoLink.setAttribute("href", config.header.links.instagramUrl);
    }

    const desktopItems = header.querySelectorAll(".menu-desktop .item-menu");
    updateLinkWithText(desktopItems[0], config.header.links?.collectionUrl, config.header.labels?.collection);
    updateLinkWithText(desktopItems[1], config.header.links?.shopUrl, config.header.labels?.shop);
    updateLinkWithText(desktopItems[2], config.header.links?.siteUrl, config.header.labels?.site);

    const desktopContact = header.querySelector(".btn-contato");
    updateLinkWithText(desktopContact, config.header.links?.whatsappUrl, config.header.labels?.contact);

    const mobileMenu = document.getElementById("menuMobile");
    if (!mobileMenu) {
        return;
    }

    const mobileItems = mobileMenu.querySelectorAll(".menu-mobile-item");
    updateLinkWithText(mobileItems[0], config.header.links?.collectionUrl, config.header.labels?.collection);
    updateLinkWithText(mobileItems[1], config.header.links?.shopUrl, config.header.labels?.shop);
    updateLinkWithText(mobileItems[2], config.header.links?.siteUrl, config.header.labels?.site);

    const mobileContact = mobileMenu.querySelector(".menu-btn-contato");
    updateLinkWithText(mobileContact, config.header.links?.whatsappUrl, config.header.labels?.contact);
}

function applyHelpSectionConfig(config) {
    const helpSection = document.querySelector(".area-ajuda");
    if (!helpSection || !config.helpSection) {
        return;
    }

    const helpTextEl = helpSection.querySelector("p");
    if (helpTextEl && config.helpSection.text) {
        helpTextEl.textContent = config.helpSection.text;
    }

    const helpLinkEl = helpSection.querySelector("a");
    if (helpLinkEl && config.helpSection.whatsappUrl) {
        helpLinkEl.setAttribute("href", config.helpSection.whatsappUrl);
    }

    const helpButtonTextEl = helpSection.querySelector("#entre-contato");
    if (helpButtonTextEl && config.helpSection.buttonText) {
        helpButtonTextEl.textContent = config.helpSection.buttonText;
    }
}

function applyFooterConfig(config) {
    const footer = document.querySelector(".rodape");
    if (!footer || !config.footer) {
        return;
    }

    const footerTextEl = footer.querySelector("p");
    if (footerTextEl && config.footer.copyright) {
        footerTextEl.textContent = config.footer.copyright;
    }

    const footerLinkEl = footer.querySelector("a");
    if (footerLinkEl && config.footer.websiteUrl) {
        footerLinkEl.setAttribute("href", config.footer.websiteUrl);
    }
}

function applyFinalPageConfig(config, configUrl) {
    const finalTextEl = document.querySelector(".texto-final h1");
    const finalButtonEl = document.querySelector(".texto-final .btn-voltar");
    const finalConfig = config.final;
    if (!finalTextEl && !finalButtonEl) {
        return;
    }

    if (finalConfig?.backgroundDesktop) {
        document.body.style.setProperty(
            "--final-background-desktop",
            `url("${resolveConfigRelativeUrl(finalConfig.backgroundDesktop, configUrl)}")`
        );
    }

    if (finalConfig?.backgroundMobile) {
        document.body.style.setProperty(
            "--final-background-mobile",
            `url("${resolveConfigRelativeUrl(finalConfig.backgroundMobile, configUrl)}")`
        );
    }

    applyFinalBackground(finalConfig, configUrl);

    if (finalTextEl && finalConfig?.textHtml) {
        finalTextEl.innerHTML = finalConfig.textHtml;
    }

    if (finalButtonEl) {
        if (finalConfig?.buttonText) {
            finalButtonEl.textContent = finalConfig.buttonText;
        }

        if (finalConfig?.buttonLink) {
            finalButtonEl.setAttribute("href", finalConfig.buttonLink);
        }
    }
}

function resolveConfigRelativeUrl(path, configUrl) {
    return new URL(path, configUrl).href;
}

function applyFinalBackground(finalConfig, configUrl) {
    if (!finalConfig?.backgroundDesktop) {
        return;
    }

    const desktopBackground = resolveConfigRelativeUrl(finalConfig.backgroundDesktop, configUrl);
    const mobileBackground = finalConfig.backgroundMobile
        ? resolveConfigRelativeUrl(finalConfig.backgroundMobile, configUrl)
        : desktopBackground;
    const mobileMedia = window.matchMedia("(max-width: 768px)");

    const updateBackground = () => {
        const background = mobileMedia.matches ? mobileBackground : desktopBackground;
        document.body.style.backgroundImage = `url("${background}")`;
    };

    updateBackground();
    mobileMedia.addEventListener("change", updateBackground);
}

function updateLinkWithText(linkEl, href, text) {
    if (!linkEl) {
        return;
    }

    if (href) {
        linkEl.setAttribute("href", href);
    }

    if (!text) {
        return;
    }

    const iconEl = linkEl.querySelector("img");
    linkEl.textContent = text;

    if (iconEl) {
        linkEl.prepend(iconEl);
        linkEl.insertBefore(document.createTextNode(" "), iconEl.nextSibling);
    }
}

function formatPageIndicator(pageNumber) {
    const parts = String(pageNumber).split("-");

    if (parts.length === 2) {
        return `P\u00c1GINA ${formatPageNumber(parts[0])} & ${formatPageNumber(parts[1])}`;
    }

    return `P\u00c1GINA ${formatPageNumber(pageNumber)}`;
}

function formatPageNumber(pageNumber) {
    const number = Number(pageNumber);

    if (!Number.isNaN(number)) {
        return number.toString().padStart(2, "0");
    }

    return String(pageNumber).toUpperCase();
}
