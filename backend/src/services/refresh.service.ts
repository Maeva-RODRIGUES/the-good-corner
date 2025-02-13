import UserEntity from "@/entities/User.entity";
import RefreshTokenRepository from "@/repositories/Refresh.repository";
import UserRepository from "@/repositories/User.repository";
import { createHash, randomBytes } from "crypto";
import { MyContext } from "..";
import Cookies from "cookies";
import RefreshTokenEntity from "@/entities/RefreshToken.entity";
export default class RefreshTokenService {
  db: RefreshTokenRepository;

  constructor() {
    this.db = new RefreshTokenRepository();
  }

  private generateRefreshTokenHash(token: string): string {
    //utilisez un algorithme de hachage rapide comme SHA-256 plutôt que argon2, un peu too much, plutôt utile pour les mots de passe
    return createHash("sha256") //1. Crée un nouveau "hasher" SHA-256
      .update(token) //2. Ajoute les données au hasher
      .digest("hex"); //3. Finalise et obtient le résultat en hex

    /**
     * Et pourquoi de l'hexadécimal?
     * C'est facilement stockable en base de données (caractères simples)
     * C'est facilement transportable (pas de caractères spéciaux)
     * C'est compact : chaque octet est représenté par 2 caractères hex (0-9 et a-f)
     */
  }

  //sauf si l'on souhaite faire du multi session actives...?
  async cleanExistantRefreshToken(user: UserEntity): Promise<void> {
    await this.db.delete({
      user: { id: user.id },
    });
  }

  async storeRefreshToken(
    token: string,
    user: UserEntity,
    req: MyContext["req"],
    res: MyContext["res"]
  ) {
    await this.cleanExistantRefreshToken(user);
    const tokenHash = this.generateRefreshTokenHash(token);
    await this.db.save({
      user,
      tokenHash,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip,
      expiresAt: this.getExpirationDate(),
    });

    const cookies = new Cookies(req, res);
    cookies.set("refreshtoken", token);
  }
  generateRefreshToken(): string {
    return randomBytes(64).toString("hex"); // 64 octets = 128 caractères hex
  }

  getExpirationDate() {
    // expire dans 30 jours
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }

  async findRefreshToken(token: string) {
    const refreshTokenEntity = await this.db.findOne({
      where: {
        tokenHash: this.generateRefreshTokenHash(token),
        isRevoked: false,
      },
      relations: ["user"],
    });
    return refreshTokenEntity;
  }

  async used(refreshData: RefreshTokenEntity) {
    return await this.db.save({ ...refreshData, lastUsedAt: new Date() });
  }
}
