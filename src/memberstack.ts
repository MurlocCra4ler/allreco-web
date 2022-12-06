const ms: any = (window as any).$memberstackDom;

ms.getCurrentMember().then(({ data: member }: { data: any }) => {
    if (member && member.customFields["force-pw-reset"] === "true" && window.location.href.indexOf("reset") < 0) {
        window.location.href = "/haendler-passwort-reset";
    }
})