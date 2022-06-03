package com.isabel.readit.services.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator.Builder;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;

@Service
public class JWTService {

    private static Logger loggedUser = LoggerFactory.getLogger(JWTService.class);

    @Value("${jwt.expiration.minutes}")
    private String jwtExpiration;

    @Value("${jwt.issuer}")
    private String jwtIssuer;

    @Value("${jwt.secret}")
    private String jwtSecret;

    public String jwtCreateToken(String email) {
        Date expiresAt = Date.from(LocalDateTime.now().plusMinutes(Integer.parseInt(jwtExpiration)).atZone(ZoneId.systemDefault()).toInstant());

        try {
            Algorithm algorithm = getAlgorithm();
            Builder builder = JWT.create();
            builder.withSubject(email).withIssuer(jwtIssuer).withIssuedAt(new Date()).withExpiresAt(expiresAt);
            return builder.sign(algorithm);

        } catch (JWTCreationException | JWTVerificationException | UnsupportedEncodingException exception) {
            return null;
        }
    }

    public boolean isTokenExpired(String token) {
        final Date expiration = this.getExpirationDateFromToken(token);
        boolean res = expiration.before(new Date());
        if (res) {
            loggedUser.warn("The token {} is expired", token);
        }
        return res;
    }

    public boolean jwtVerifyToken(String token) {
        try {
            Algorithm algorithm = getAlgorithm();
            JWTVerifier verifier = JWT.require(algorithm).withIssuer(this.jwtIssuer).build();
            if (verifier.verify(token) != null) {
                return (!this.isTokenExpired(token));
            }
            loggedUser.error("Invalid token {}", token);
            return false;
        } catch (UnsupportedEncodingException | JWTVerificationException exception) {
            loggedUser.error(exception.getLocalizedMessage(), exception);
            return false;
        }
    }

    public String getEmailFromToken(String token) {
        return jwtDecodeToken(token).getSubject();
    }

    public Map<String, Claim> getClaims(String token) {
        return jwtDecodeToken(token).getClaims();
    }

    public Date getExpirationDateFromToken(String token) {
        return jwtDecodeToken(token).getExpiresAt();
    }

    private DecodedJWT jwtDecodeToken(String token) {
        return JWT.decode(token);
    }

    private Algorithm getAlgorithm() throws IllegalArgumentException, UnsupportedEncodingException {
        return Algorithm.HMAC256(jwtSecret);
    }

    public String getTokenEmailFromContext() {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        }
        return null;
    }
}
