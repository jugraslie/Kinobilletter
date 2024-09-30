package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/billetter")
public class BillettController {

    private final List<Billett> billetter = new ArrayList<>();

    @PostMapping
    public void lagreBillett(@RequestBody Billett billett) {
        billetter.add(billett);
    }

    @GetMapping
    public List<Billett> hentBilletter() {
        return billetter;
    }

    @DeleteMapping
    public void slettAlleBilletter() {
        billetter.clear();
    }
}
