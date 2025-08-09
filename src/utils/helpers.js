export function setSaveButtonText(
    btn, 
    isLoading,
    defaultText = "Save", 
    loadingText = "Saving...") 
{
    if (isLoading) {
        btn.textContent = loadingText;
    } else {
        btn.textContent = defaultText;
    }
};