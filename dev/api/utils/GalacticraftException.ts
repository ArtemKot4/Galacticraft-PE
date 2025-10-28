/**
 * Class to throw exceptions from galacticraft
 */
class GalacticraftException extends Error {
    public constructor(message: string) {
        super(message);
        this.name = "GalacticraftException";
    }
}